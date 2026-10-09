"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import { createHaloMaterial } from "./haloMaterial";
import { cn } from "@/lib/utils";

const HOVER_SCALE = 1.4;
const ACTIVE_SCALE = 1.22;
const INTERACTIVE_THRESHOLD = 0.5;

const GLOW_BY_KIND = {
  core: 4.6,
  section: 3.6,
  external: 3.4,
  project: 3.0,
  satellite: 2.4,
};

export default function NetworkNode({
  node,
  visibility,
  isHovered,
  isActive,
  registerNode,
  onHover,
  onSelect,
  reducedMotion,
  touch,
  labelPortal,
}) {
  const scaleRef = useRef(null);
  const coreMaterialRef = useRef(null);
  const ringRef = useRef(null);
  const ringMaterialRef = useRef(null);
  const labelRef = useRef(null);

  const attachGroup = useCallback((object) => registerNode(node.id, object), [node.id, registerNode]);
  const baseColor = useMemo(() => new THREE.Color(node.color), [node.color]);
  const haloMaterial = useMemo(() => createHaloMaterial(node.color, node.phase), [node.color, node.phase]);
  useEffect(() => () => haloMaterial.dispose(), [haloMaterial]);

  const glow = GLOW_BY_KIND[node.kind];
  const hasRing = node.kind !== "satellite" && node.kind !== "project";
  const hitRadius = node.size * (touch ? 3.2 : 2.2);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const time = state.clock.elapsedTime;
    const vis = visibility.value;
    const emphasis = isHovered ? HOVER_SCALE : isActive ? ACTIVE_SCALE : 1;
    const breathe = reducedMotion ? 1 : 1 + Math.sin(time * 1.6 + node.phase) * 0.06;

    if (scaleRef.current) {
      easing.damp3(scaleRef.current.scale, emphasis * breathe * (0.4 + 0.6 * vis), 0.16, dt);
    }

    const pulse = reducedMotion ? 1 : 1 + Math.sin(time * 2.2 + node.phase) * 0.14;
    const intensity = glow * pulse * (isHovered || isActive ? 1.7 : 1) * (0.12 + 0.88 * vis);

    if (coreMaterialRef.current) {
      coreMaterialRef.current.color.copy(baseColor).multiplyScalar(intensity);
      coreMaterialRef.current.opacity = 0.2 + 0.8 * vis;
    }

    haloMaterial.uniforms.uTime.value = time;
    haloMaterial.uniforms.uIntensity.value = intensity * 0.6;
    haloMaterial.uniforms.uOpacity.value = vis;

    if (ringRef.current && !reducedMotion) {
      ringRef.current.rotation.x = time * 0.55 + node.phase;
      ringRef.current.rotation.y = time * 0.35;
    }
    if (ringMaterialRef.current) {
      ringMaterialRef.current.emissiveIntensity = intensity * 0.45;
      ringMaterialRef.current.opacity = 0.15 + 0.6 * vis;
    }

    if (labelRef.current) {
      const labelOpacity = Math.max(0, (vis - 0.35) / 0.65);
      labelRef.current.style.opacity = labelOpacity.toFixed(3);
    }
  });

  const handlePointerOver = (event) => {
    event.stopPropagation();
    if (visibility.value < INTERACTIVE_THRESHOLD) return;
    onHover(node.id, true);
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    onHover(node.id, false);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    if (visibility.value < INTERACTIVE_THRESHOLD) return;
    onSelect(node.id);
  };

  return (
    <group ref={attachGroup} position={node.position}>
      <group ref={scaleRef}>
        <mesh>
          <sphereGeometry args={[node.size, 32, 32]} />
          <meshBasicMaterial ref={coreMaterialRef} toneMapped={false} transparent />
        </mesh>
        <mesh scale={1.9} material={haloMaterial}>
          <sphereGeometry args={[node.size, 32, 32]} />
        </mesh>
        {hasRing && (
          <mesh ref={ringRef}>
            <torusGeometry args={[node.size * 1.75, node.size * 0.035, 8, 96]} />
            <meshStandardMaterial
              ref={ringMaterialRef}
              color="#0b1220"
              emissive={node.color}
              metalness={0.6}
              roughness={0.3}
              transparent
              toneMapped={false}
            />
          </mesh>
        )}
      </group>
      <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
        <sphereGeometry args={[hitRadius, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>
      <Html
        position={[0, -(node.size * 2.1 + 0.16), 0]}
        center
        portal={labelPortal}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={labelRef}
          className={cn(
            "node-label whitespace-nowrap select-none font-mono uppercase tracking-[0.18em] transition-[color,text-shadow] duration-300",
            node.kind === "core" && "text-[12px] text-white",
            (node.kind === "section" || node.kind === "external") && "text-[11px] text-slate-200",
            (node.kind === "satellite" || node.kind === "project") && "text-[9px] text-slate-400",
            (isHovered || isActive) && "text-white",
          )}
          style={{ textShadow: isHovered || isActive ? `0 0 12px ${node.color}` : "none" }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}
