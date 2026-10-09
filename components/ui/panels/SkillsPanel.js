"use client";

import { ChartColumn, Cpu, Database } from "lucide-react";
import { skillGroups } from "@/lib/resume";
import { useFocusScroll } from "@/lib/useFocusScroll";
import { Chip, FocusBlock, SectionTitle } from "@/components/ui/Primitives";

const COLOR = "#34d399";
const ICONS = { ml: Cpu, data: Database, analytics: ChartColumn };

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
              <Chip key={item} color={focus === group.id ? COLOR : undefined} className="text-[12px]">
                {item}
              </Chip>
            ))}
          </div>
        </FocusBlock>
      ))}
    </div>
  );
}
