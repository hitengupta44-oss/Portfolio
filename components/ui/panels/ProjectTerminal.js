"use client";

import { ArrowUpRight, CircleDot, Terminal } from "lucide-react";
import { projectMap, profile } from "@/lib/resume";
import { NODE_MAP } from "@/lib/graph";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Chip, ExternalButton, SectionTitle } from "@/components/ui/Primitives";

const PROMPT = "hiten@portfolio:~$";

function buildTerminalLines(project) {
  const strip = (url) => url.replace("https://", "");
  return [
    { kind: "command", text: `${PROMPT} open ${project.slug}` },
    { kind: "ok", text: `stack    ${project.stack.join(", ").toLowerCase()}` },
    { kind: "ok", text: `status   ${project.status.toLowerCase()}` },
    { kind: "ok", text: `live     ${strip(project.liveUrl)}` },
    { kind: "command", text: `${PROMPT} git remote -v` },
    { kind: "log", text: `origin  ${strip(project.sourceUrl)} (fetch)` },
  ];
}

const LINE_STYLES = {
  command: "text-slate-100",
  ok: "text-emerald-300/90",
  log: "text-slate-400",
};

export default function ProjectTerminal({ projectId }) {
  const project = projectMap[projectId];
  if (!project) return null;
  const color = NODE_MAP[project.id].color;
  const lines = buildTerminalLines(project);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-6">
      <section className="flex flex-col">
        <SectionTitle icon={CircleDot} color={color}>
          {project.status}
        </SectionTitle>
        <p className="text-[16px] leading-relaxed text-slate-100">{project.overview}</p>
        <ul className="mt-4 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-[14px] leading-relaxed text-slate-300">
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: color }} />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2.5 md:mt-auto md:pt-6">
          <ExternalButton href={project.liveUrl} variant="primary" color={color}>
            Live demo
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ExternalButton>
          <ExternalButton href={project.sourceUrl} icon={GitHubIcon}>
            Source
          </ExternalButton>
          <ExternalButton href={`mailto:${profile.email}?subject=${encodeURIComponent(project.title)}`}>
            Ask about it
          </ExternalButton>
        </div>
      </section>

      <section
        className="overflow-hidden rounded-xl border border-white/10 bg-black/50"
        aria-label={`${project.title} summary as a terminal session`}
      >
        <header className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
            <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
            {project.slug}
          </span>
        </header>
        <div className="scroll-thin max-h-[52vh] overflow-y-auto p-4 font-mono text-[12px] leading-relaxed">
          {lines.map((line, index) => (
            <p
              key={`${line.kind}-${index}`}
              className={`animate-type-in whitespace-pre-wrap break-words ${LINE_STYLES[line.kind]}`}
              style={{ animationDelay: `${0.2 + index * 0.12}s` }}
            >
              {line.text}
            </p>
          ))}
          <p
            className="animate-type-in text-slate-100"
            style={{ animationDelay: `${0.2 + lines.length * 0.12}s` }}
          >
            {PROMPT} <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-slate-300 animate-caret" />
          </p>
        </div>
      </section>
    </div>
  );
}
