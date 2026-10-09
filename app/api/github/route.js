import { NextResponse } from "next/server";
import { profile } from "@/lib/resume";
import { buildMockGitHubData, normalizeGitHubData } from "@/lib/github";

const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 1800;

async function requestGitHub(path) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "hiten-gupta-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status} for ${path}`);
  }
  return response.json();
}

export async function GET() {
  const login = profile.githubUser;
  try {
    const [user, repos, events] = await Promise.all([
      requestGitHub(`/users/${login}`),
      requestGitHub(`/users/${login}/repos?sort=pushed&per_page=30&type=owner`),
      requestGitHub(`/users/${login}/events/public?per_page=60`),
    ]);
    return NextResponse.json(normalizeGitHubData({ user, repos, events }), {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 2}`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { ...buildMockGitHubData(login), reason: error instanceof Error ? error.message : "GitHub API unavailable" },
      { headers: { "Cache-Control": "public, s-maxage=300" } },
    );
  }
}
