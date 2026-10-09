"use client";

import { Briefcase } from "lucide-react";
import { experience } from "@/lib/resume";
import { useFocusScroll } from "@/lib/useFocusScroll";
import { Chip, FocusBlock, SectionTitle } from "@/components/ui/Primitives";

const COLOR = "#a78bfa";

export default function ExperiencePanel({ focus }) {
  useFocusScroll(focus);

  return (
    <div className="space-y-2">
      {experience.map((role) => (
        <FocusBlock key={role.id} id={role.id} focused={focus === role.id} color={COLOR}>
          <SectionTitle icon={Briefcase} color={COLOR}>
            {role.type}
          </SectionTitle>
          <h3 className="text-lg font-semibold text-white">{role.role}</h3>
          <p className="text-sm text-violet-300">{role.company}</p>
          <ul className="mt-4 space-y-2.5">
            {role.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(167,139,250,0.6)]" />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {role.stack.map((item) => (
              <Chip key={item} color={COLOR}>
                {item}
              </Chip>
            ))}
          </div>
        </FocusBlock>
      ))}
    </div>
  );
}
