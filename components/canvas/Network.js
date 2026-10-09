"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";
import NetworkNode from "./NetworkNode";
import ConnectionLines from "./ConnectionLines";
import { NODES, getRelatedIds } from "@/lib/graph";

const ROTATION_SPEED = 0.055;
const COLLAPSE_FACTOR = 0.3;
const POINTER_IDLE_MS = 1400;
const GROUP_ROTATION = [0.16, 0, 0];

export default function Network({
  groupRef,
  layoutScale,
  activeId,
  hoveredId,
  onHover,
  onSelect,
  reducedMotion,
  touch,
  labelPortal,
}) {
  const gl = useThree((state) => state.gl);
  const nodeObjects = useRef(new Map());
  const linesRef = useRef(null);

  const runtime = useMemo(
    () => ({
      positions: new Map(NODES.map((node) => [node.id, new THREE.Vector3(...node.position)])),
      visibility: new Map(NODES.map((node) => [node.id, { value: 1 }])),
      pull: { value: 0 },
      lastPointerMove: -Infinity,
      raycaster: new THREE.Raycaster(),
      localRay: new THREE.Ray(),
      inverseMatrix: new THREE.Matrix4(),
      target: new THREE.Vector3(),
    }),
    [],
  );

  const related = useMemo(() => getRelatedIds(activeId), [activeId]);

  useEffect(() => {
    const element = gl.domElement;
    const handlePointerMove = () => {
      runtime.lastPointerMove = performance.now();
    };
    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerdown", handlePointerMove);
    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerdown", handlePointerMove);
    };
  }, [gl, runtime]);

  const registerNode = useCallback((id, object) => {
    if (object) nodeObjects.current.set(id, object);
    else nodeObjects.current.delete(id);
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.elapsedTime;

    if (!activeId && !reducedMotion) {
      group.rotation.y += dt * ROTATION_SPEED;
    }
    easing.damp3(group.scale, layoutScale, 0.4, dt);

    for (const node of NODES) {
      const isRelated = !related || related.has(node.id);
      const emphasis = !related || node.id === activeId ? 1 : isRelated ? 0.72 : 0.08;
      const [x, y, z] = node.position;
      const bob = reducedMotion ? 0 : Math.sin(time * 0.7 + node.phase) * 0.06;
      if (isRelated) {
        runtime.target.set(x, y + bob, z);
      } else {
        runtime.target.set(x * COLLAPSE_FACTOR, y * COLLAPSE_FACTOR + bob, z * COLLAPSE_FACTOR);
      }
      const current = runtime.positions.get(node.id);
      easing.damp3(current, runtime.target, 0.32, dt);
      easing.damp(runtime.visibility.get(node.id), "value", emphasis, 0.26, dt);
      const object = nodeObjects.current.get(node.id);
      if (object) object.position.copy(current);
    }

    const pointerActive = performance.now() - runtime.lastPointerMove < POINTER_IDLE_MS;
    easing.damp(runtime.pull, "value", pointerActive ? 1 : 0, 0.25, dt);

    group.updateMatrixWorld();
    runtime.raycaster.setFromCamera(state.pointer, state.camera);
    runtime.inverseMatrix.copy(group.matrixWorld).invert();
    runtime.localRay.copy(runtime.raycaster.ray).applyMatrix4(runtime.inverseMatrix);

    linesRef.current?.update({
      positions: runtime.positions,
      visibility: runtime.visibility,
      ray: runtime.localRay,
      pull: runtime.pull.value,
      hoveredId,
      activeId,
      time,
    });
  });

  return (
    <group ref={groupRef} rotation={GROUP_ROTATION}>
      <ConnectionLines ref={linesRef} />
      {NODES.map((node) => (
        <NetworkNode
          key={node.id}
          node={node}
          visibility={runtime.visibility.get(node.id)}
          isHovered={hoveredId === node.id}
          isActive={activeId === node.id}
          registerNode={registerNode}
          onHover={onHover}
          onSelect={onSelect}
          reducedMotion={reducedMotion}
          touch={touch}
          labelPortal={labelPortal}
        />
      ))}
    </group>
  );
}
