"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import HUD from "@/components/ui/HUD";
import Loader from "@/components/ui/Loader";
import OverlayPanel from "@/components/ui/OverlayPanel";
import { NODE_MAP } from "@/lib/graph";

const Experience = dynamic(() => import("@/components/canvas/Experience"), {
  ssr: false,
  loading: () => <Loader />,
});

function readNodeFromHash() {
  const id = window.location.hash.replace("#", "");
  return NODE_MAP[id] ? id : null;
}

function writeHash(id) {
  const url = id ? `#${id}` : `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", url);
}

export default function Page() {
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const select = useCallback((id) => {
    const nextId = NODE_MAP[id] ? id : null;
    setActiveId(nextId);
    setHoveredId(null);
    writeHash(nextId);
  }, []);

  const close = useCallback(() => select(null), [select]);

  const hover = useCallback((id, entering) => {
    setHoveredId((current) => {
      if (entering) return id;
      return current === id ? null : current;
    });
  }, []);

  useEffect(() => {
    const initial = readNodeFromHash();
    if (initial) {
      const timer = window.setTimeout(() => setActiveId(initial), 900);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") close();
    };
    const handleHashChange = () => setActiveId(readNodeFromHash());
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [close]);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-void">
      <Experience activeId={activeId} hoveredId={hoveredId} onHover={hover} onSelect={select} />
      <HUD activeId={activeId} hoveredId={hoveredId} onSelect={select} onHome={close} />
      <OverlayPanel activeId={activeId} onClose={close} onSelect={select} />
    </main>
  );
}
