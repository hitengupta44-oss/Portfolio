"use client";

import { Download, GraduationCap, Mail, MapPin, Phone, Trophy, User } from "lucide-react";
import { achievements, education, profile } from "@/lib/resume";
import { useFocusScroll } from "@/lib/useFocusScroll";
import { FocusBlock, SectionTitle } from "@/components/ui/Primitives";

const COLOR = "#7ea6ff";

const contactLink =
  "flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-white/5 hover:text-white";

export default function AboutPanel({ focus }) {
  useFocusScroll(focus);

  return (
    <div className="space-y-2">
      <FocusBlock id="summary" color={COLOR}>
        <SectionTitle icon={User} color={COLOR}>
          Summary
        </SectionTitle>
        <p className="text-[16px] leading-relaxed text-slate-100">{profile.summary}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{profile.focus}</p>
        <ul className="mt-5 grid gap-1 text-sm text-slate-300 sm:grid-cols-2">
          <li>
            <a href={`mailto:${profile.email}`} className={contactLink}>
              <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
              {profile.email}
            </a>
          </li>
          <li>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className={contactLink}>
              <Phone className="h-4 w-4 text-slate-500" aria-hidden="true" />
              {profile.phone}
            </a>
          </li>
          <li className="flex items-center gap-2.5 px-2 py-1.5 sm:col-span-2">
            <MapPin className="h-4 w-4 text-slate-500" aria-hidden="true" />
            {profile.location}
          </li>
        </ul>
        <a
          href={profile.resumeUrl}
          download
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/25 px-3.5 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.06]"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download resume
        </a>
      </FocusBlock>

      <FocusBlock id="education" focused={focus === "education"} color={COLOR}>
        <SectionTitle icon={GraduationCap} color={COLOR}>
          Education
        </SectionTitle>
        <ol className="relative space-y-5 border-l border-white/12 pl-5">
          {education.map((entry) => (
            <li key={entry.id} className="relative">
              <span className="absolute -left-[24.5px] top-[7px] h-2 w-2 rounded-full bg-slate-500 ring-4 ring-[#0b101c]" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="font-semibold text-white">{entry.title}</p>
                <p className="text-sm font-medium text-slate-300">{entry.detail}</p>
              </div>
              <p className="text-sm text-slate-400">{entry.institution}</p>
              {entry.extra && <p className="mt-0.5 text-sm text-slate-300">{entry.extra}</p>}
            </li>
          ))}
        </ol>
      </FocusBlock>

      <FocusBlock id="achievements" focused={focus === "achievements"} color={COLOR}>
        <SectionTitle icon={Trophy} color={COLOR}>
          Achievements
        </SectionTitle>
        <ul className="space-y-2">
          {achievements.map((achievement) => (
            <li
              key={achievement.id}
              className="flex items-start gap-3 rounded-lg border border-white/8 bg-white/[0.02] px-3.5 py-3 text-sm leading-relaxed text-slate-200"
            >
              <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-300/80" aria-hidden="true" />
              {achievement.title}
            </li>
          ))}
        </ul>
      </FocusBlock>
    </div>
  );
}
