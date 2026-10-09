"use client";

import { ChevronRight, FolderGit2 } from "lucide-react";
import { projects } from "@/lib/resume";
import { NODE_MAP } from "@/lib/graph";
import { Chip, SectionTitle } from "@/components/ui/Primitives";

export default function ProjectsPanel({ onSelect }) {
  return (
    <div className="p-4">
      <SectionTitle icon={FolderGit2} color="#f472b6">
        Select a project to open its terminal
      </SectionTitle>
      <ul className="grid gap-3">
        {projects.map((project) => {
          const color = NODE_MAP[project.id].color;
          return (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => onSelect(project.id)}
                className="group w-full rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
                style={{ boxShadow: `inset 3px 0 0 ${color}` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{project.title}</p>
                    <p className="text-xs text-slate-400">{project.context}</p>
                  </div>
                  <ChevronRight
                    className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-300">{project.overview}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((item) => (
                    <Chip key={item} className="px-2 py-0.5 text-[10px]">
                      {item}
                    </Chip>
                  ))}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
