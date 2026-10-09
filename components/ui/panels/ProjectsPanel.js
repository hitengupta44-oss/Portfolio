"use client";

import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { projects } from "@/lib/resume";
import { NODE_MAP } from "@/lib/graph";
import { Chip, SectionTitle } from "@/components/ui/Primitives";

export default function ProjectsPanel({ onSelect }) {
  return (
    <div className="p-4">
      <SectionTitle icon={FolderGit2} color="#e59cc0">
        Select a project for details
      </SectionTitle>
      <ul className="grid gap-3">
        {projects.map((project) => {
          const color = NODE_MAP[project.id].color;
          return (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => onSelect(project.id)}
                className="group w-full rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition duration-200 hover:border-white/25 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ boxShadow: `inset 3px 0 0 ${color}` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-xl font-medium text-white">{project.title}</p>
                    <p className="mt-0.5 text-sm text-slate-400">{project.context}</p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.overview}</p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {project.stack.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                  <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-300/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
