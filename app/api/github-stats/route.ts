import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "PranavAD36";
    
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        // Add auth token in .env if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && { "Authorization": `token ${process.env.GITHUB_TOKEN}` })
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    // Fetch repositories data
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && { "Authorization": `token ${process.env.GITHUB_TOKEN}` })
      },
      next: { revalidate: 3600 }
    });

    const repos = await reposResponse.json();

    // Calculate stats
    const totalRepos = userData.public_repos;
    const followers = userData.followers;
    const following = userData.following;
    const publicRepos = repos.filter((repo: any) => !repo.fork).length;
    
    // Calculate total stars
    const totalStars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

    // Get language stats
    const languageStats: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    }

    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([lang, count]) => ({ language: lang, count }));

    return NextResponse.json({
      username,
      name: userData.name,
      avatar: userData.avatar_url,
      bio: userData.bio,
      profileUrl: userData.html_url,
      publicRepos: totalRepos,
      followers,
      following,
      publicReposCount: publicRepos,
      totalStars,
      topLanguages,
      company: userData.company,
      location: userData.location,
      email: userData.email,
      blog: userData.blog,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch GitHub stats",
        fallback: {
          username: "PranavAD36",
          publicRepos: 0,
          followers: 0,
          following: 0,
          totalStars: 0,
          topLanguages: [],
        }
      },
      { status: 500 }
    );
  }
}
