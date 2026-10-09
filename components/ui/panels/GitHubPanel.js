"use client";

import { ArrowUpRight, Clock, GitBranch, GitCommitHorizontal, GitFork, Star } from "lucide-react";
import { profile } from "@/lib/resume";
import { useGitHubData } from "@/lib/useGitHubData";
import { formatRelativeTime } from "@/lib/utils";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { ExternalButton, SectionTitle } from "@/components/ui/Primitives";

const COLOR = "#d8b66a";

function ActivityBars({ activity }) {
  const peak = Math.max(1, ...activity.map((day) => day.count));
  const total = activity.reduce((sum, day) => sum + day.count, 0);
  return (
    <div>
      <div
        className="flex h-16 items-end gap-1"
        role="img"
        aria-label={`${total} public GitHub events over the last 14 days`}
      >
        {activity.map((day) => (
          <div key={day.date} className="flex h-full flex-1 items-end">
            <div
              className="w-full rounded-sm transition-[height] duration-700"
              style={{
                height: `${Math.max(6, (day.count / peak) * 100)}%`,
                background: COLOR,
                opacity: day.count ? 0.85 : 0.16,
              }}
              title={`${new Date(day.date).toLocaleDateString()}: ${day.count} events`}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
        <span>14 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function RecentPushes({ pushes }) {
  return (
    <ol className="space-y-2.5">
      {pushes.map((push) => (
        <li key={push.id} className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-white">{push.repo}</p>
            <span className="flex shrink-0 items-center gap-1 text-[11px] text-slate-500">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {formatRelativeTime(push.createdAt)}
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <GitBranch className="h-3 w-3" aria-hidden="true" />
            {push.branch}
          </p>
          <ul className="mt-2 space-y-1">
            {push.commits.length > 0 ? (
              push.commits.slice(0, 3).map((commit) => (
                <li key={commit.sha} className="flex gap-2 text-[13px] text-slate-300">
                  <GitCommitHorizontal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
                  <span className="truncate">{commit.message}</span>
                </li>
              ))
            ) : (
              <li className="flex gap-2 text-[13px] text-slate-300">
                <GitCommitHorizontal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
                {push.commitCount ? `${push.commitCount} commit${push.commitCount === 1 ? "" : "s"} pushed` : "Pushed"}
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
            className="group block rounded-lg border border-white/8 bg-white/[0.02] p-3 transition hover:border-white/25 hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="truncate font-semibold text-white">{repo.name}</p>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-white"
                aria-hidden="true"
              />
            </div>
            {repo.description && <p className="mt-1 line-clamp-2 text-[13px] text-slate-400">{repo.description}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: COLOR }} />
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
              {repo.pushedAt && <span>Updated {formatRelativeTime(repo.pushedAt)}</span>}
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
        <div key={index} className="h-16 animate-pulse rounded-lg bg-white/[0.04]" />
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
        <ExternalButton href={profile.github} icon={GitHubIcon} color={COLOR} variant="primary">
          Open GitHub profile
        </ExternalButton>
      </div>
    );
  }

  if (!data) return <LoadingState />;

  const live = data.source === "live";

  return (
    <div className="space-y-2">
      <section className="flex items-center gap-4 p-4">
        {data.profile.avatarUrl ? (
          <img
            src={data.profile.avatarUrl}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-white/15"
          />
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]">
            <GitHubIcon className="h-7 w-7 text-slate-300" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">{data.profile.name}</p>
          <p className="truncate text-sm text-slate-400">@{data.profile.login}</p>
          {data.profile.publicRepos !== null && (
            <p className="mt-0.5 text-xs text-slate-500">
              {data.profile.publicRepos} repositories, {data.profile.followers} followers
            </p>
          )}
        </div>
      </section>

      {live && (
        <>
          <section className="px-4 pb-4">
            <SectionTitle icon={GitCommitHorizontal} color={COLOR}>
              Recent activity
            </SectionTitle>
            <ActivityBars activity={data.activity} />
          </section>

          {data.pushes.length > 0 && (
            <section className="px-4 pb-4">
              <SectionTitle icon={GitBranch} color={COLOR}>
                Latest pushes
              </SectionTitle>
              <RecentPushes pushes={data.pushes} />
            </section>
          )}
        </>
      )}

      <section className="px-4 pb-4">
        <SectionTitle icon={GitBranch} color={COLOR}>
          Repositories
        </SectionTitle>
        <RepoList repos={data.repos} />
        {!live && (
          <p className="mt-3 text-xs text-slate-500">Live activity is unavailable right now; showing featured repositories.</p>
        )}
      </section>

      <section className="px-4 pb-6">
        <ExternalButton href={data.profile.url} icon={GitHubIcon} color={COLOR} variant="primary">
          Open GitHub profile
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </ExternalButton>
      </section>
    </div>
  );
}
