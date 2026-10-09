"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { random } from "maath";

export default function ParticleField({ count, reducedMotion }) {
  const groupRef = useRef(null);
  const farField = useMemo(() => random.inSphere(new Float32Array(count * 3), { radius: 40 }), [count]);
  const nearDust = useMemo(
    () => random.inSphere(new Float32Array(Math.floor(count / 5) * 3), { radius: 10 }),
    [count],
  );

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y -= delta * 0.012;
    groupRef.current.rotation.x -= delta * 0.004;
  });

  return (
    <group ref={groupRef}>
      <Points positions={farField} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#94a3b8"
          size={0.07}
          sizeAttenuation
          depthWrite={false}
          opacity={0.55}
          fog={false}
        />
      </Points>
      <Points positions={nearDust} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#67e8f9"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          opacity={0.35}
          fog={false}
        />
      </Points>
    </group>
  );
}
