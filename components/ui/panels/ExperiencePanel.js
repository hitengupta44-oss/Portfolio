"use client";

import { Briefcase, Users } from "lucide-react";
import { experience, leadership } from "@/lib/resume";
import { useFocusScroll } from "@/lib/useFocusScroll";
import { Chip, FocusBlock, SectionTitle } from "@/components/ui/Primitives";

const COLOR = "#a99bff";

function Highlights({ items }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((highlight) => (
        <li key={highlight} className="flex gap-3 text-[14px] leading-relaxed text-slate-300">
          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
          {highlight}
        </li>
      ))}
    </ul>
  );
}

export default function ExperiencePanel({ focus }) {
  useFocusScroll(focus);
  // The Techathon node focuses the leadership block, which is anchored on the first (current) entry.
  const leadId = leadership[0].id;

  return (
    <div className="space-y-2">
      {experience.map((role) => (
        <FocusBlock key={role.id} id={role.id} focused={focus === role.id} color={COLOR}>
          <SectionTitle icon={Briefcase} color={COLOR}>
            {role.type}
          </SectionTitle>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-lg font-semibold text-white">{role.role}</h3>
            {role.period && <p className="text-sm text-slate-400">{role.period}</p>}
          </div>
          <p className="text-sm text-slate-300">{role.company}</p>
          <Highlights items={role.highlights} />
          <div className="mt-4 flex flex-wrap gap-1.5">
            {role.stack.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </FocusBlock>
      ))}

      <FocusBlock id={leadId} focused={focus === leadId} color={COLOR}>
        <SectionTitle icon={Users} color={COLOR}>
          Leadership
        </SectionTitle>
        <div className="space-y-6">
          {leadership.map((entry) => (
            <div key={entry.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[17px] font-semibold text-white">{entry.role}</h3>
                <p className="text-sm text-slate-400">{entry.period}</p>
              </div>
              <p className="text-sm text-slate-300">{entry.organisation}</p>
              <Highlights items={entry.highlights} />
            </div>
          ))}
        </div>
      </FocusBlock>
    </div>
  );
}
