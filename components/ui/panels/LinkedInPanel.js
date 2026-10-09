import { ArrowUpRight, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { education, experience, profile } from "@/lib/resume";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { ExternalButton } from "@/components/ui/Primitives";

const COLOR = "#6aa9ff";

export default function LinkedInPanel() {
  return (
    <div className="p-4">
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] font-serif text-xl text-white">
            HG
          </span>
          <div>
            <p className="text-lg font-semibold text-white">{profile.name}</p>
            <p className="text-sm text-slate-400">{profile.role}</p>
          </div>
        </div>
        <ul className="mt-5 space-y-2.5 text-sm text-slate-300">
          <li className="flex items-center gap-2.5">
            <Briefcase className="h-4 w-4 text-slate-500" aria-hidden="true" />
            {experience[0].role}, {experience[0].company}
          </li>
          <li className="flex items-center gap-2.5">
            <GraduationCap className="h-4 w-4 text-slate-500" aria-hidden="true" />
            {education[0].institution}
          </li>
          <li className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 text-slate-500" aria-hidden="true" />
            {profile.location}
          </li>
        </ul>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-slate-400">
        Get in touch about AI/ML, data or backend internships, or to collaborate on a project.
      </p>
      <div className="mt-4">
        <ExternalButton href={profile.linkedin} icon={LinkedInIcon} color={COLOR} variant="primary">
          Open LinkedIn profile
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </ExternalButton>
      </div>
    </div>
  );
}
