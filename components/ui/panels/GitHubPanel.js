"use client";

import { ArrowUpRight, Clock, GitBranch, GitCommitHorizontal, GitFork, Radio, Star } from "lucide-react";
import { profile } from "@/lib/resume";
import { useGitHubData } from "@/lib/useGitHubData";
import { cn, formatRelativeTime } from "@/lib/utils";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { ExternalButton, SectionTitle } from "@/components/ui/Primitives";

const COLOR = "#fbbf24";
const PIPELINE_STAGES = ["commit", "push"];

function SourceBadge({ source }) {
  const live = source === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest",
        live ? "border-emerald-400/40 text-emerald-300" : "border-amber-400/40 text-amber-300",
      )}
    >
      <Radio className={cn("h-3 w-3", live && "animate-pulse")} aria-hidden="true" />
      {live ? "Live API" : "Sample data"}
    </span>
  );
}

function ActivityBars({ activity }) {
  const peak = Math.max(1, ...activity.map((day) => day.count));
  return (
    <div>
      <div className="flex h-16 items-end gap-1" role="img" aria-label="Public GitHub activity over the last 14 days">
        {activity.map((day) => (
          <div key={day.date} className="flex h-full flex-1 items-end">
            <div
              className="w-full rounded-sm bg-amber-300/80 shadow-[0_0_10px_-2px_rgba(251,191,36,0.8)] transition-[height] duration-700"
              style={{ height: `${Math.max(6, (day.count / peak) * 100)}%`, opacity: day.count ? 1 : 0.18 }}
              title={`${new Date(day.date).toLocaleDateString()}: ${day.count} events`}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-slate-500">
        <span>14 days ago</span>
        <span>today</span>
      </div>
    </div>
  );
}

function CommitPipeline({ pushes }) {
  if (!pushes.length) {
    return <p className="text-sm text-slate-400">No recent public pushes.</p>;
  }
  return (
    <ol className="space-y-3">
      {pushes.map((push, index) => (
        <li key={push.id} className="rounded-xl border border-white/8 bg-black/30 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-mono text-[12px] text-white">{push.repo}</p>
            <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-slate-500">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {formatRelativeTime(push.createdAt)}
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-2" aria-hidden="true">
            {[...PIPELINE_STAGES, push.branch].map((stage, stageIndex) => (
              <div key={stage + stageIndex} className="flex flex-1 items-center gap-2 last:flex-none">
                <span
                  className={cn(
                    "rounded-md border px-1.5 py-0.5 font-mono text-[10px]",
                    stageIndex === 2 ? "border-amber-400/50 text-amber-200" : "border-white/10 text-slate-400",
                  )}
                >
                  {stageIndex === 2 && <GitBranch className="mr-1 inline h-3 w-3" />}
                  {stage}
                </span>
                {stageIndex < 2 && (
                  <span
                    className="h-px flex-1 flow-line animate-flow"
                    style={{ animationDelay: `${index * 0.3 + stageIndex * 0.2}s` }}
                  />
                )}
              </div>
            ))}
          </div>
          <ul className="mt-2.5 space-y-1">
            {push.commits.length > 0 ? (
              push.commits.slice(0, 3).map((commit) => (
                <li key={commit.sha} className="flex gap-2 font-mono text-[11px] text-slate-300">
                  <GitCommitHorizontal className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
                  <span className="text-amber-200/80">{commit.sha}</span>
                  <span className="truncate">{commit.message}</span>
                </li>
              ))
            ) : (
              <li className="flex gap-2 font-mono text-[11px] text-slate-300">
                <GitCommitHorizontal className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
                <span className="text-amber-200/80">{push.head || "head"}</span>
                <span>
                  {push.commitCount ? `${push.commitCount} commit${push.commitCount === 1 ? "" : "s"} pushed` : "pushed"}
                </span>
              </li>
            )}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function RepoList({ repos }) {
  return (
    <ul className="grid gap-2.5">
      {repos.map((repo) => (
        <li key={repo.id}>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-white/8 bg-white/[0.02] p-3 transition hover:border-amber-300/40 hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="truncate font-medium text-white">{repo.name}</p>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-amber-300"
                aria-hidden="true"
              />
            </div>
            {repo.description && <p className="mt-1 line-clamp-2 text-xs text-slate-400">{repo.description}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[10px] text-slate-500">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" aria-hidden="true" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3 w-3" aria-hidden="true" />
                {repo.forks}
              </span>
              <span>updated {formatRelativeTime(repo.pushedAt)}</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3 p-4" aria-busy="true">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="h-16 animate-pulse rounded-xl bg-white/[0.04]" />
      ))}
    </div>
  );
}

export default function GitHubPanel({ active }) {
  const { status, data } = useGitHubData(active);

  if (status === "error") {
    return (
      <div className="space-y-4 p-4">
        <p className="text-sm text-slate-300">GitHub data could not be loaded right now.</p>
        <ExternalButton href={profile.github} icon={GitHubIcon} color={COLOR}>
          Open GitHub profile
        </ExternalButton>
      </div>
    );
  }

  if (!data) return <LoadingState />;

  return (
    <div className="space-y-2">
      <section className="flex items-center gap-4 p-4">
        {data.profile.avatarUrl ? (
          <img
            src={data.profile.avatarUrl}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-amber-300/40"
          />
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/40 bg-amber-300/10">
            <GitHubIcon className="h-7 w-7 text-amber-200" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">{data.profile.name}</p>
          <p className="truncate font-mono text-xs text-slate-400">@{data.profile.login}</p>
          {data.profile.publicRepos !== null && (
            <p className="mt-1 font-mono text-[11px] text-slate-500">
              {data.profile.publicRepos} repos · {data.profile.followers} followers
            </p>
          )}
        </div>
        <SourceBadge source={data.source} />
      </section>

      <section className="px-4 pb-4">
        <SectionTitle icon={Radio} color={COLOR}>
          Activity pulse
        </SectionTitle>
        <ActivityBars activity={data.activity} />
      </section>

      <section className="px-4 pb-4">
        <SectionTitle icon={GitCommitHorizontal} color={COLOR}>
          Commit pipeline
        </SectionTitle>
        <CommitPipeline pushes={data.pushes} />
      </section>

      <section className="px-4 pb-4">
        <SectionTitle icon={GitBranch} color={COLOR}>
          Repositories
        </SectionTitle>
        <RepoList repos={data.repos} />
      </section>

      <section className="px-4 pb-6">
        <ExternalButton href={data.profile.url} icon={GitHubIcon} color={COLOR}>
          Open GitHub profile
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </ExternalButton>
      </section>
    </div>
  );
}
