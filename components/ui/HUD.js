"use client";

import { Mail, MousePointerClick } from "lucide-react";
import { NODE_MAP, PRIMARY_NAV } from "@/lib/graph";
import { profile } from "@/lib/resume";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const SOCIALS = [
  { href: profile.github, label: "GitHub", icon: GitHubIcon },
  { href: profile.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
];

function isWithinSection(activeId, sectionId) {
  if (!activeId) return false;
  if (activeId === sectionId) return true;
  const node = NODE_MAP[activeId];
  if (sectionId === "projects") return node.panel === "project";
  return node.panel === NODE_MAP[sectionId].panel && node.kind === "satellite";
}

export default function HUD({ activeId, hoveredId, onSelect, onHome }) {
  const hovered = hoveredId ? NODE_MAP[hoveredId] : null;
  const panelOpen = Boolean(activeId);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-4 p-4 md:p-6">
        <button
          type="button"
          onClick={onHome}
          className={cn(
            "pointer-events-auto text-left transition-opacity duration-500",
            panelOpen && "max-md:opacity-0",
          )}
          aria-label="Return to constellation overview"
        >
          <h1 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{profile.name}</h1>
          <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300/90 md:text-[11px] md:tracking-[0.28em]">
            {profile.shortRole}
          </p>
        </button>
        <nav
          aria-label="Social links"
          className={cn(
            "pointer-events-auto flex gap-2 transition-opacity duration-500",
            panelOpen && "md:pointer-events-none md:opacity-0",
          )}
        >
          {SOCIALS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="glass-soft rounded-full p-2.5 text-slate-300 transition hover:text-white hover:shadow-[0_0_18px_-4px_rgba(34,211,238,0.8)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </nav>
      </header>

      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 p-4 transition-[opacity,transform] duration-500 md:p-6",
          panelOpen && "max-md:translate-y-8 max-md:opacity-0 md:items-start",
        )}
      >
        <p
          className="hidden h-5 font-mono text-[11px] tracking-wide text-slate-400 md:block"
          aria-live="polite"
        >
          {hovered ? (
            <span style={{ color: hovered.color }}>
              {hovered.label} <span className="text-slate-400">· {hovered.hint}</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
              Drag to orbit · scroll to zoom · click a node
            </span>
          )}
        </p>
        <nav
          aria-label="Resume sections"
          className={cn(
            "glass-soft pointer-events-auto flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5 scroll-thin",
            panelOpen && "max-md:pointer-events-none",
          )}
        >
          {PRIMARY_NAV.map((id) => {
            const node = NODE_MAP[id];
            const selected = isWithinSection(activeId, id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(id)}
                aria-pressed={selected}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider md:gap-2 md:px-3 md:text-[11px] md:tracking-widest transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
                  selected ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white",
                )}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: node.color, boxShadow: `0 0 8px 1px ${node.color}` }}
                />
                {node.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
