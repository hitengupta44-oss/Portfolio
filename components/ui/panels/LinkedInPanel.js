import { ArrowUpRight, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { education, experience, profile } from "@/lib/resume";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { ExternalButton } from "@/components/ui/Primitives";

const COLOR = "#60a5fa";

export default function LinkedInPanel() {
  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-2xl border border-blue-400/20 bg-black/30">
        <div className="h-20 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.55),transparent_60%),radial-gradient(circle_at_80%_60%,rgba(34,211,238,0.35),transparent_55%)]" />
        <div className="-mt-8 px-5 pb-5">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-300/60 bg-slate-950 text-xl font-semibold text-white shadow-[0_0_24px_-4px_rgba(96,165,250,0.8)]">
            HG
          </span>
          <p className="mt-3 text-lg font-semibold text-white">{profile.name}</p>
          <p className="text-sm text-blue-200">{profile.role}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-300" aria-hidden="true" />
              {experience[0].role}, {experience[0].company}
            </li>
            <li className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-300" aria-hidden="true" />
              {education[0].institution}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-300" aria-hidden="true" />
              {profile.location}
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-slate-400">
        Connect for collaborations, internships and ML engineering roles.
      </p>
      <div className="mt-4">
        <ExternalButton href={profile.linkedin} icon={LinkedInIcon} color={COLOR}>
          Open LinkedIn profile
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </ExternalButton>
      </div>
    </div>
  );
}
