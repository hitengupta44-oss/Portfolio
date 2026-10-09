"use client";

import { Braces, Cpu, Database, Wrench } from "lucide-react";
import { skillGroups } from "@/lib/resume";
import { useFocusScroll } from "@/lib/useFocusScroll";
import { Chip, FocusBlock, SectionTitle } from "@/components/ui/Primitives";

const COLOR = "#6fcfb0";
const ICONS = { lang: Braces, ml: Cpu, data: Database, tools: Wrench };

export default function SkillsPanel({ focus }) {
  useFocusScroll(focus);

  return (
    <div className="space-y-2">
      {skillGroups.map((group) => (
        <FocusBlock key={group.id} id={group.id} focused={focus === group.id} color={COLOR}>
          <SectionTitle icon={ICONS[group.id]} color={COLOR}>
            {group.title}
          </SectionTitle>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Chip key={item} color={focus === group.id ? COLOR : undefined} className="px-2.5 py-1 text-[13px]">
                {item}
              </Chip>
            ))}
          </div>
        </FocusBlock>
      ))}
    </div>
  );
}
