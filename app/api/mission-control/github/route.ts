import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "PranavAD36";

    // Fetch user data to verify the account exists
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && { "Authorization": `token ${process.env.GITHUB_TOKEN}` })
      },
      next: { revalidate: 3600 }
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: "GitHub user not found" },
        { status: userResponse.status }
      );
    }

    const userData = await userResponse.json();

    // Return graph URL and profile info
    // We use a public service to generate the contribution graph
    const graphUrl = `https://ghchart.radekmie.pl/${username}`;
    const profileUrl = `https://github.com/${username}`;

    return NextResponse.json({
      username,
      graphUrl,
      profileUrl,
      name: userData.name || username,
      avatar: userData.avatar_url
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Unable to load GitHub data" },
      { status: 500 }
    );
  }
}
