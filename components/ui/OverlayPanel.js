"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { NODE_MAP } from "@/lib/graph";
import { projectMap } from "@/lib/resume";
import { cn } from "@/lib/utils";
import AboutPanel from "./panels/AboutPanel";
import ExperiencePanel from "./panels/ExperiencePanel";
import SkillsPanel from "./panels/SkillsPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import ProjectTerminal from "./panels/ProjectTerminal";
import GitHubPanel from "./panels/GitHubPanel";
import LinkedInPanel from "./panels/LinkedInPanel";

const PANEL_META = {
  about: { kicker: "Profile", title: "About" },
  experience: { kicker: "Career", title: "Experience" },
  projects: { kicker: "Work", title: "Projects" },
  skills: { kicker: "Toolkit", title: "Technical Skills" },
  github: { kicker: "External hook", title: "GitHub" },
  linkedin: { kicker: "External hook", title: "LinkedIn" },
};

function getHeading(node) {
  if (node.panel === "project") {
    const project = projectMap[node.projectId];
    return { kicker: project.context, title: project.title };
  }
  return PANEL_META[node.panel];
}

function PanelBody({ node, open, onSelect }) {
  switch (node.panel) {
    case "about":
      return <AboutPanel focus={node.focus} />;
    case "experience":
      return <ExperiencePanel focus={node.focus} />;
    case "skills":
      return <SkillsPanel focus={node.focus} />;
    case "projects":
      return <ProjectsPanel onSelect={onSelect} />;
    case "project":
      return <ProjectTerminal key={node.projectId} projectId={node.projectId} />;
    case "github":
      return <GitHubPanel active={open} />;
    case "linkedin":
      return <LinkedInPanel />;
    default:
      return null;
  }
}

export default function OverlayPanel({ activeId, onClose, onSelect }) {
  const [shownId, setShownId] = useState(activeId);
  const closeButtonRef = useRef(null);
  const scrollRef = useRef(null);

  if (activeId && activeId !== shownId) {
    setShownId(activeId);
  }

  const open = Boolean(activeId);
  const node = shownId ? NODE_MAP[shownId] : null;

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!activeId || !scrollRef.current) return;
    if (!NODE_MAP[activeId].focus) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  if (!node) return null;

  const heading = getHeading(node);
  const isProject = node.panel === "project";

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="overlay-title"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "glass fixed z-40 flex flex-col overflow-hidden rounded-3xl",
        "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "inset-x-2 bottom-2 h-[62dvh]",
        "md:inset-x-auto md:bottom-4 md:right-4 md:top-4 md:h-auto",
        isProject ? "md:w-[min(1040px,64vw)]" : "md:w-[min(520px,46vw)]",
        open
          ? "translate-y-0 opacity-100 md:translate-x-0"
          : "pointer-events-none translate-y-[110%] opacity-0 md:translate-x-[110%] md:translate-y-0",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${node.color}, transparent)` }}
      />
      <header className="flex items-start justify-between gap-4 border-b border-white/8 px-5 pb-4 pt-5">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: node.color }}>
            {heading.kicker}
          </p>
          <h2 id="overlay-title" className="mt-1 line-clamp-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
            {heading.title}
          </h2>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:rotate-90 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          aria-label="Close panel and return to the constellation"
        >
          <X className="h-4 w-4" />
        </button>
      </header>
      <div ref={scrollRef} className="scroll-thin flex-1 overflow-y-auto overscroll-contain px-1 pb-4 pt-1">
        <PanelBody node={node} open={open} onSelect={onSelect} />
      </div>
    </aside>
  );
}
