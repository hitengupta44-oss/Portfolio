"use client";

import { Download, Mail, MousePointerClick } from "lucide-react";
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-4 p-4 md:p-7">
        <button
          type="button"
          onClick={onHome}
          className={cn(
            "pointer-events-auto text-left transition-opacity duration-500",
            panelOpen && "max-md:opacity-0",
          )}
          aria-label="Return to the overview"
        >
          <h1 className="font-serif text-3xl font-medium tracking-tight text-white md:text-[2.5rem] md:leading-none">
            {profile.name}
          </h1>
          <p className="mt-1.5 text-sm text-slate-400 md:mt-2 md:text-[15px]">{profile.role}</p>
        </button>

        <div
          className={cn(
            "pointer-events-auto flex items-center gap-2 transition-opacity duration-500",
            panelOpen && "md:pointer-events-none md:opacity-0",
          )}
        >
          <p className="glass-soft hidden items-center gap-2 rounded-full px-3.5 py-2 text-[13px] text-slate-300 lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </p>
          <a
            href={profile.resumeUrl}
            download
            className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-slate-950 transition hover:bg-slate-200 sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Resume
          </a>
          <nav aria-label="Social links" className="flex gap-1.5">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="glass-soft rounded-full p-2.5 text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 p-4 transition-[opacity,transform] duration-500 md:p-7",
          panelOpen && "max-md:translate-y-8 max-md:opacity-0 md:items-start",
        )}
      >
        <p className="hidden h-5 text-[13px] text-slate-400 md:block" aria-live="polite">
          {hovered ? (
            <span>
              <span className="font-semibold" style={{ color: hovered.color }}>
                {hovered.label}
              </span>
              <span className="text-slate-400"> – {hovered.hint}</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
              Drag to rotate, scroll to zoom, click a node to open it
            </span>
          )}
        </p>
        <nav
          aria-label="Portfolio sections"
          className={cn(
            "glass-soft pointer-events-auto flex max-w-full gap-0.5 overflow-x-auto rounded-full p-1 scroll-thin",
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
                  "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:px-3.5",
                  selected ? "bg-white/12 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white",
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: node.color }} />
                {node.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
