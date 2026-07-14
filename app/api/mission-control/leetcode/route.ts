import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "tFt4QC7qdx";

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          userCalendar {
            streak
          }
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch LeetCode data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.errors || !data.data?.matchedUser) {
      return NextResponse.json(
        { error: "Unable to fetch LeetCode stats" },
        { status: 400 }
      );
    }

    const submitStats = data.data.matchedUser.submitStats.acSubmissionNum;
    const streak = data.data.matchedUser.userCalendar.streak || 0;

    const easyCount = submitStats.find((s: any) => s.difficulty === "Easy")?.count || 0;
    const mediumCount = submitStats.find((s: any) => s.difficulty === "Medium")?.count || 0;
    const hardCount = submitStats.find((s: any) => s.difficulty === "Hard")?.count || 0;
    const totalSolved = easyCount + mediumCount + hardCount;

    return NextResponse.json({
      totalSolved,
      easyCount,
      mediumCount,
      hardCount,
      streak,
      profileUrl: `https://leetcode.com/u/${username}/`
    });
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json(
      { error: "Unable to load LeetCode data" },
      { status: 500 }
    );
  }
}
