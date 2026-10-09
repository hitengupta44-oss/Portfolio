"use client";

import { GraduationCap, Mail, MapPin, Phone, Sparkles, Trophy } from "lucide-react";
import { achievements, education, profile } from "@/lib/resume";
import { useFocusScroll } from "@/lib/useFocusScroll";
import { FocusBlock, SectionTitle } from "@/components/ui/Primitives";

const COLOR = "#22d3ee";

export default function AboutPanel({ focus }) {
  useFocusScroll(focus);

  return (
    <div className="space-y-2">
      <FocusBlock id="summary" color={COLOR}>
        <SectionTitle icon={Sparkles} color={COLOR}>
          Summary
        </SectionTitle>
        <p className="text-[15px] leading-relaxed text-slate-200">{profile.summary}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{profile.focus}</p>
        <ul className="mt-5 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-white/5 hover:text-white"
            >
              <Mail className="h-4 w-4 text-cyan-300" aria-hidden="true" />
              {profile.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-white/5 hover:text-white"
            >
              <Phone className="h-4 w-4 text-cyan-300" aria-hidden="true" />
              {profile.phone}
            </a>
          </li>
          <li className="flex items-center gap-2 px-2 py-1.5 sm:col-span-2">
            <MapPin className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            {profile.location}
          </li>
        </ul>
      </FocusBlock>

      <FocusBlock id="education" focused={focus === "education"} color={COLOR}>
        <SectionTitle icon={GraduationCap} color={COLOR}>
          Education
        </SectionTitle>
        <ol className="relative space-y-4 border-l border-cyan-400/20 pl-5">
          {education.map((entry) => (
            <li key={entry.id} className="relative">
              <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]" />
              <p className="font-medium text-white">{entry.title}</p>
              <p className="text-sm text-slate-400">{entry.institution}</p>
              <p className="mt-0.5 font-mono text-xs text-cyan-300">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </FocusBlock>

      <FocusBlock id="achievements" focused={focus === "achievements"} color={COLOR}>
        <SectionTitle icon={Trophy} color={COLOR}>
          Achievements
        </SectionTitle>
        <ul className="space-y-2.5">
          {achievements.map((achievement) => (
            <li
              key={achievement.id}
              className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm text-slate-200"
            >
              <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
              {achievement.title}
            </li>
          ))}
        </ul>
      </FocusBlock>
    </div>
  );
}
