"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import Scene from "./Scene";
import { detectWebGL, useViewportProfile } from "@/lib/useViewportProfile";

const INITIAL_CAMERA = { position: [0, 2, 26], fov: 50, near: 0.1, far: 200 };
const GL_OPTIONS = {
  antialias: false,
  alpha: false,
  stencil: false,
  depth: true,
  powerPreference: "high-performance",
};

export default function Experience({ activeId, hoveredId, onHover, onSelect }) {
  const viewport = useViewportProfile();
  const labelLayerRef = useRef(null);
  const [webglSupported] = useState(detectWebGL);
  const maxDpr = viewport.compact ? 1.6 : 2;
  const [dpr, setDpr] = useState(Math.min(1.5, maxDpr));
  const [quality, setQuality] = useState(viewport.compact ? "low" : "high");

  if (!webglSupported) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,#111a2e_0%,#070b14_70%)]"
      />
    );
  }

  return (
    <div className="fixed inset-0" aria-hidden="true">
      <Canvas dpr={dpr} gl={GL_OPTIONS} camera={INITIAL_CAMERA}>
        <PerformanceMonitor
          flipflops={3}
          onIncline={() => setDpr(maxDpr)}
          onDecline={() => {
            setDpr(1);
            setQuality("low");
          }}
          onFallback={() => {
            setDpr(1);
            setQuality("low");
          }}
        />
        <Suspense fallback={null}>
          <Scene
            activeId={activeId}
            hoveredId={hoveredId}
            onHover={onHover}
            onSelect={onSelect}
            quality={quality}
            reducedMotion={viewport.reducedMotion}
            touch={viewport.coarsePointer}
            labelPortal={labelLayerRef}
          />
        </Suspense>
      </Canvas>
      <div ref={labelLayerRef} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" />
    </div>
  );
}
