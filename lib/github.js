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
  const hoursAgo = (hours) => new Date(now - hours * 60 * 60 * 1000).toISOString();

  const repos = [
    {
      id: 1,
      name: "search-automation-chatbot",
      description: "NLP-driven natural language search for products and services.",
      language: "Python",
      stars: 0,
      forks: 0,
      url: `https://github.com/${login}`,
      pushedAt: hoursAgo(5),
    },
    {
      id: 2,
      name: "sales-automation-chatbot",
      description: "Lead qualification, FAQ handling and automated customer follow-ups.",
      language: "Python",
      stars: 0,
      forks: 0,
      url: `https://github.com/${login}`,
      pushedAt: hoursAgo(28),
    },
    {
      id: 3,
      name: "scrapy-data-pipeline",
      description: "Multi-source scraping, cleaning and validation with Scrapy and Pandas.",
      language: "Python",
      stars: 0,
      forks: 0,
      url: `https://github.com/${login}`,
      pushedAt: hoursAgo(76),
    },
    {
      id: 4,
      name: "forecasting-ml-models",
      description: "Supervised and unsupervised models with automated training pipelines.",
      language: "Jupyter Notebook",
      stars: 0,
      forks: 0,
      url: `https://github.com/${login}`,
      pushedAt: hoursAgo(140),
    },
  ];

  const pushes = [
    {
      id: "mock-1",
      repo: "search-automation-chatbot",
      branch: "main",
      head: "a1c9e42",
      commitCount: 2,
      commits: [
        { sha: "a1c9e42", message: "Improve intent matching for service queries" },
        { sha: "7d02b1f", message: "Add FastAPI endpoint for chat search" },
      ],
      createdAt: hoursAgo(5),
    },
    {
      id: "mock-2",
      repo: "sales-automation-chatbot",
      branch: "main",
      head: "c44ab90",
      commitCount: 1,
      commits: [{ sha: "c44ab90", message: "Refine lead qualification flow" }],
      createdAt: hoursAgo(28),
    },
    {
      id: "mock-3",
      repo: "scrapy-data-pipeline",
      branch: "dev",
      head: "5e8f213",
      commitCount: 3,
      commits: [
        { sha: "5e8f213", message: "Deduplicate records across sources" },
        { sha: "91ab6c0", message: "Add schema validation step" },
        { sha: "0f3d7aa", message: "Parallelise spider scheduling" },
      ],
      createdAt: hoursAgo(76),
    },
  ];

  const activityDates = [5, 7, 28, 30, 52, 76, 77, 79, 100, 140, 190, 220, 260, 300].map(hoursAgo);

  return {
    source: "mock",
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
    pushes,
    activity: buildActivity(activityDates, now),
  };
}
