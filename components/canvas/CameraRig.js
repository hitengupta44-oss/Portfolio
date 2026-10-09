"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { FRAMING, NODE_MAP } from "@/lib/graph";
import { PANEL_LAYOUT, getPanelFraction } from "@/lib/layout";

const FOCUS_DISTANCE = {
  core: 5.4,
  section: 4.6,
  external: 4.6,
  project: 4.2,
  satellite: 4.0,
};
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const SIDE_TILT = 0.65;

function getViewDirection(world, anchor, camera, compact) {
  const direction = world.clone().sub(anchor);
  if (direction.lengthSq() < 0.01) direction.copy(camera.position).normalize();
  direction.normalize();
  const forward = direction.clone().negate();
  const right = new THREE.Vector3().crossVectors(forward, WORLD_UP);
  if (right.lengthSq() < 0.0001) right.set(1, 0, 0);
  right.normalize();
  const up = new THREE.Vector3().crossVectors(right, forward).normalize();
  const tilt = compact ? up.multiplyScalar(-SIDE_TILT) : right.multiplyScalar(SIDE_TILT);
  return direction.add(tilt).normalize();
}

function getHomeDistance(camera, aspect, layoutScale) {
  const halfVertical = THREE.MathUtils.degToRad(camera.fov) / 2;
  const halfHorizontal = Math.atan(Math.tan(halfVertical) * aspect);
  const verticalFit = (FRAMING.vertical * layoutScale) / Math.tan(halfVertical);
  const horizontalFit = (FRAMING.horizontal * layoutScale) / Math.tan(halfHorizontal);
  return Math.max(verticalFit, horizontalFit) * 1.04;
}

export default function CameraRig({ groupRef, activeId, layoutScale, reducedMotion }) {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);

  useEffect(() => {
    if (!controls || !groupRef.current) return undefined;

    const aspect = width / height;
    const destination = new THREE.Vector3();
    const lookAt = new THREE.Vector3();
    const node = activeId ? NODE_MAP[activeId] : null;

    if (node) {
      const group = groupRef.current;
      group.updateMatrixWorld();
      const world = group.localToWorld(new THREE.Vector3(...node.position));
      const anchor = node.parent
        ? group.localToWorld(new THREE.Vector3(...NODE_MAP[node.parent].position))
        : group.localToWorld(new THREE.Vector3());
      const compact = width < PANEL_LAYOUT.breakpoint;
      const direction = getViewDirection(world, anchor, camera, compact);
      const distance = FOCUS_DISTANCE[node.kind] * layoutScale * (compact ? 1.3 : 1);
      destination.copy(world).addScaledVector(direction, distance);

      const forward = world.clone().sub(destination).normalize();
      const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
      const up = new THREE.Vector3().crossVectors(right, forward).normalize();
      const halfHeight = distance * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
      const fraction = getPanelFraction(width, height, node.kind === "project");
      const shift = compact
        ? up.multiplyScalar(-fraction * halfHeight)
        : right.multiplyScalar(fraction * halfHeight * aspect);

      destination.add(shift);
      lookAt.copy(world).add(shift);
    } else {
      const distance = getHomeDistance(camera, aspect, layoutScale);
      const lift = -0.45 * layoutScale;
      destination.set(0, distance * 0.08 + lift, distance);
      lookAt.set(0, lift, 0);
    }

    controls.enabled = false;
    const duration = reducedMotion ? 0.01 : 1.5;
    const timeline = gsap.timeline({
      defaults: { duration, ease: "power3.inOut" },
      onUpdate: () => controls.update(),
      onComplete: () => {
        controls.enabled = true;
      },
    });
    timeline.to(camera.position, { x: destination.x, y: destination.y, z: destination.z }, 0);
    timeline.to(controls.target, { x: lookAt.x, y: lookAt.y, z: lookAt.z }, 0);

    return () => {
      timeline.kill();
      controls.enabled = true;
    };
  }, [activeId, camera, controls, groupRef, width, height, layoutScale, reducedMotion]);

  return null;
}
