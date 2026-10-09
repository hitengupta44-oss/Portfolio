const DAY_MS = 24 * 60 * 60 * 1000;
export const ACTIVITY_DAYS = 14;

function startOfDay(timestamp) {
  const date = new Date(timestamp);
  date.setUTCHours(0, 0, 0, 0);
  return date.getTime();
}

export function buildActivity(dates, now = Date.now()) {
  const today = startOfDay(now);
  const buckets = Array.from({ length: ACTIVITY_DAYS }, (_, index) => ({
    date: new Date(today - (ACTIVITY_DAYS - 1 - index) * DAY_MS).toISOString(),
    count: 0,
  }));
  for (const value of dates) {
    const offset = Math.round((today - startOfDay(new Date(value).getTime())) / DAY_MS);
    if (offset >= 0 && offset < ACTIVITY_DAYS) {
      buckets[ACTIVITY_DAYS - 1 - offset].count += 1;
    }
  }
  return buckets;
}

function normalizePush(event) {
  const payload = event.payload ?? {};
  const commits = Array.isArray(payload.commits)
    ? payload.commits.map((commit) => ({
        sha: String(commit.sha ?? "").slice(0, 7),
        message: String(commit.message ?? "").split("\n")[0],
      }))
    : [];
  return {
    id: event.id,
    repo: event.repo?.name?.split("/")[1] ?? "repository",
    branch: String(payload.ref ?? "refs/heads/main").replace("refs/heads/", ""),
    head: String(payload.head ?? commits.at(-1)?.sha ?? "").slice(0, 7),
    commitCount: payload.size ?? payload.distinct_size ?? commits.length,
    commits,
    createdAt: event.created_at,
  };
}

export function normalizeGitHubData({ user, repos, events }) {
  const ownRepos = repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 8)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
    }));

  const pushes = events
    .filter((event) => event.type === "PushEvent")
    .slice(0, 6)
    .map(normalizePush);

  return {
    source: "live",
    fetchedAt: new Date().toISOString(),
    profile: {
      login: user.login,
      name: user.name ?? user.login,
      avatarUrl: user.avatar_url,
      url: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
    },
    repos: ownRepos,
    pushes,
    activity: buildActivity(events.map((event) => event.created_at)),
  };
}

export function buildMockGitHubData(login, now = Date.now()) {
  // Fallback used when the GitHub API is unreachable. It lists only the real
  // repositories linked from the resume and never invents commits or activity.
  const repos = [
    {
      id: 1,
      name: "GENHIVE02",
      description: "GenHive: AI sales assistant that answers from a knowledge base and qualifies leads.",
      language: "Python",
      stars: 0,
      forks: 0,
      url: `https://github.com/${login}/GENHIVE02`,
      pushedAt: null,
    },
    {
      id: 2,
      name: "hive_search_bot",
      description: "Hive Search Bot: conversational search for the HiveRift website, built in Next.js.",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      url: `https://github.com/${login}/hive_search_bot`,
      pushedAt: null,
    },
  ];

  return {
    source: "fallback",
    fetchedAt: new Date(now).toISOString(),
    profile: {
      login,
      name: "Hiten Gupta",
      avatarUrl: null,
      url: `https://github.com/${login}`,
      publicRepos: null,
      followers: null,
    },
    repos,
    pushes: [],
    activity: buildActivity([], now),
  };
}
