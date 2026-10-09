"use client";

import { ArrowUpRight, CircleDot, Terminal } from "lucide-react";
import { projectMap, profile } from "@/lib/resume";
import { NODE_MAP } from "@/lib/graph";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Chip, ExternalButton, SectionTitle } from "@/components/ui/Primitives";

function buildTerminalLines(project) {
  const sourceLabel = project.sourceUrl.replace("https://", "");
  return [
    { kind: "command", text: `hiten@constellation:~$ open --project ${project.slug}` },
    { kind: "ok", text: `resolved node  ${project.slug}` },
    { kind: "ok", text: `context        ${project.context}` },
    { kind: "ok", text: `stack          ${project.stack.join(" · ").toLowerCase()}` },
    { kind: "ok", text: `status         ${project.status.toLowerCase()}` },
    ...project.highlights.map((highlight, index) => ({
      kind: "log",
      text: `[${String(index + 1).padStart(2, "0")}] ${highlight}`,
    })),
    { kind: "command", text: `hiten@constellation:~$ git remote -v` },
    { kind: "log", text: `origin  ${sourceLabel} (fetch)` },
  ];
}

const LINE_STYLES = {
  command: "text-cyan-300",
  ok: "text-emerald-300",
  log: "text-slate-300",
};

export default function ProjectTerminal({ projectId }) {
  const project = projectMap[projectId];
  if (!project) return null;
  const color = NODE_MAP[project.id].color;
  const lines = buildTerminalLines(project);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-5">
      <section className="flex flex-col">
        <SectionTitle icon={CircleDot} color={color}>
          {project.status}
        </SectionTitle>
        <p className="text-[15px] leading-relaxed text-slate-200">{project.overview}</p>
        <ul className="mt-4 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-slate-300">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: color, boxShadow: `0 0 10px 2px ${color}` }}
              />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Chip key={item} color={color}>
              {item}
            </Chip>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-auto md:pt-6">
          <ExternalButton href={project.sourceUrl} icon={GitHubIcon} color={color}>
            View source
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ExternalButton>
          <ExternalButton href={`mailto:${profile.email}?subject=${encodeURIComponent(project.title)}`} color="#94a3b8">
            Ask about it
          </ExternalButton>
        </div>
      </section>

      <section
        className="overflow-hidden rounded-2xl border border-white/10 bg-black/55 shadow-[0_0_40px_-18px_rgba(244,114,182,0.6)]"
        aria-label={`${project.title} terminal`}
      >
        <header className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
            {project.slug}
          </span>
        </header>
        <div className="scroll-thin max-h-[52vh] overflow-y-auto p-4 font-mono text-[12px] leading-relaxed">
          {lines.map((line, index) => (
            <p
              key={`${line.kind}-${index}`}
              className={`animate-type-in whitespace-pre-wrap break-words ${LINE_STYLES[line.kind]}`}
              style={{ animationDelay: `${0.25 + index * 0.14}s` }}
            >
              {line.kind === "ok" && <span className="text-emerald-400">✓ </span>}
              {line.text}
            </p>
          ))}
          <p
            className="animate-type-in text-cyan-300"
            style={{ animationDelay: `${0.25 + lines.length * 0.14}s` }}
          >
            hiten@constellation:~$ <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-cyan-300 animate-caret" />
          </p>
        </div>
      </section>
    </div>
  );
}
