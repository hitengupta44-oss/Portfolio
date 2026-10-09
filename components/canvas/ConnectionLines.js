"use client";

import { useEffect, useImperativeHandle, useMemo } from "react";
import * as THREE from "three";
import { EDGES, NODE_MAP } from "@/lib/graph";

const SEGMENTS = 18;
const VERTICES_PER_EDGE = SEGMENTS + 1;

export default function ConnectionLines({ ref }) {
  const edges = useMemo(
    () =>
      EDGES.map(([source, target], index) => ({
        source,
        target,
        colorA: new THREE.Color(NODE_MAP[source].color),
        colorB: new THREE.Color(NODE_MAP[target].color),
        offset: (index * 0.137) % 1,
        speed: 0.18 + (index % 5) * 0.045,
      })),
    [],
  );

  const geometry = useMemo(() => {
    const vertexCount = EDGES.length * VERTICES_PER_EDGE;
    const positions = new Float32Array(vertexCount * 3);
    const colors = new Float32Array(vertexCount * 3);
    const indices = [];
    for (let edgeIndex = 0; edgeIndex < EDGES.length; edgeIndex += 1) {
      const base = edgeIndex * VERTICES_PER_EDGE;
      for (let segment = 0; segment < SEGMENTS; segment += 1) {
        indices.push(base + segment, base + segment + 1);
      }
    }
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
    );
    bufferGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
    bufferGeometry.setIndex(indices);
    bufferGeometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return bufferGeometry;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const scratch = useMemo(
    () => ({ point: new THREE.Vector3(), closest: new THREE.Vector3(), color: new THREE.Color() }),
    [],
  );

  useImperativeHandle(
    ref,
    () => ({
      update({ positions, visibility, ray, pull, hoveredId, activeId, time }) {
        const positionArray = geometry.attributes.position.array;
        const colorArray = geometry.attributes.color.array;
        const radius = hoveredId ? 1.6 : 1.1;
        const strength = (hoveredId ? 0.55 : 0.3) * pull;
        const { point, closest, color } = scratch;
        let cursor = 0;

        for (const edge of edges) {
          const start = positions.get(edge.source);
          const end = positions.get(edge.target);
          const edgeVisibility = Math.min(visibility.get(edge.source).value, visibility.get(edge.target).value);
          const touchesHover = hoveredId === edge.source || hoveredId === edge.target;
          const touchesActive = activeId === edge.source || activeId === edge.target;
          const baseBrightness = touchesHover ? 1.3 : touchesActive ? 0.95 : 0.3;
          const packetGain = touchesHover || touchesActive ? 3.4 : 1.7;
          const head = (time * edge.speed + edge.offset) % 1;

          for (let step = 0; step <= SEGMENTS; step += 1) {
            const t = step / SEGMENTS;
            point.lerpVectors(start, end, t);

            if (strength > 0.001) {
              ray.closestPointToPoint(point, closest);
              const distance = point.distanceTo(closest);
              if (distance < radius) {
                const falloff = 1 - distance / radius;
                point.lerp(closest, falloff * falloff * strength * Math.sin(Math.PI * t));
              }
            }

            const offset = cursor * 3;
            positionArray[offset] = point.x;
            positionArray[offset + 1] = point.y;
            positionArray[offset + 2] = point.z;

            const delta = t - head;
            const packet = Math.exp(-delta * delta * 140) * packetGain;
            color
              .copy(edge.colorA)
              .lerp(edge.colorB, t)
              .multiplyScalar((baseBrightness + packet) * edgeVisibility);
            colorArray[offset] = color.r;
            colorArray[offset + 1] = color.g;
            colorArray[offset + 2] = color.b;
            cursor += 1;
          }
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
      },
    }),
    [geometry, edges, scratch],
  );

  return (
    <lineSegments geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial
        vertexColors
        transparent
        toneMapped={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
