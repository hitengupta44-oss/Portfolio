"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import Network from "./Network";
import CameraRig from "./CameraRig";
import ParticleField from "./ParticleField";

const BACKGROUND = "#070b14";

function getLayoutScale(aspect) {
  if (aspect < 0.8) return 0.72;
  if (aspect < 1.2) return 0.88;
  return 1;
}

export default function Scene({
  activeId,
  hoveredId,
  onHover,
  onSelect,
  quality,
  reducedMotion,
  touch,
  labelPortal,
}) {
  const groupRef = useRef(null);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  const layoutScale = getLayoutScale(width / height);
  const highQuality = quality === "high";

  useEffect(() => {
    document.body.style.cursor = hoveredId ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hoveredId]);

  return (
    <>
      <color attach="background" args={[BACKGROUND]} />
      <fog attach="fog" args={[BACKGROUND, 16, 46]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[7, 6, 6]} intensity={52} color="#9db8ff" distance={40} />
      <pointLight position={[-7, -5, -6]} intensity={34} color="#c9a0d8" distance={40} />
      <directionalLight position={[0, 8, 4]} intensity={0.4} color="#b9bfe8" />

      <ParticleField count={highQuality ? 4200 : 1800} reducedMotion={reducedMotion} />

      <Network
        groupRef={groupRef}
        layoutScale={layoutScale}
        activeId={activeId}
        hoveredId={hoveredId}
        onHover={onHover}
        onSelect={onSelect}
        reducedMotion={reducedMotion}
        touch={touch}
        labelPortal={labelPortal}
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        zoomSpeed={0.7}
        minDistance={2.2}
        maxDistance={34}
      />
      <CameraRig
        groupRef={groupRef}
        activeId={activeId}
        layoutScale={layoutScale}
        reducedMotion={reducedMotion}
      />

      <EffectComposer multisampling={highQuality ? 4 : 0}>
        <Bloom
          mipmapBlur
          luminanceThreshold={1}
          luminanceSmoothing={0.25}
          intensity={highQuality ? 0.8 : 0.6}
          radius={0.6}
        />
        <Vignette eskil={false} offset={0.18} darkness={0.7} />
      </EffectComposer>
    </>
  );
}
