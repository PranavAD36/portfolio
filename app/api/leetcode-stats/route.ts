import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "tFt4QC7qdx";

    // LeetCode unofficial GraphQL endpoint
    const query = `
      query getUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          username
          name
          profile {
            userAvatar
            realName
            aboutMe
            school
            websites
            countryName
            skillTags
            resume
          }
          socialAccounts
          contestBadge {
            name
            expired
            hoverText
            medal {
              slug
              config {
                icon
              }
            }
          }
          submissionCalendar
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          badges {
            id
            displayName
            medal {
              slug
              config {
                icon
                iconGif
              }
            }
            creationDate
          }
          upcomingStreaks {
            streakCount
            duration
          }
          userCalendar {
            activeYears
            streak
            totalActiveDays
            submissionCalendar
          }
          languageStats {
            langName
            problemsSolved
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
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0]?.message || "LeetCode API error");
    }

    const matchedUser = data.data?.matchedUser;
    if (!matchedUser) {
      throw new Error("User not found on LeetCode");
    }

    // Parse submission stats
    const acSubmissionNum = matchedUser.submitStats?.acSubmissionNum || [];
    const totalSolved = acSubmissionNum.reduce((sum: number, item: any) => sum + (item.count || 0), 0);
    
    const easyCount = acSubmissionNum.find((item: any) => item.difficulty === "Easy")?.count || 0;
    const mediumCount = acSubmissionNum.find((item: any) => item.difficulty === "Medium")?.count || 0;
    const hardCount = acSubmissionNum.find((item: any) => item.difficulty === "Hard")?.count || 0;

    // Get top languages
    const topLanguages = matchedUser.languageStats
      ?.sort((a: any, b: any) => b.problemsSolved - a.problemsSolved)
      .slice(0, 5)
      .map((lang: any) => ({
        language: lang.langName,
        count: lang.problemsSolved
      })) || [];

    // Get streak
    const streak = matchedUser.userCalendar?.streak || 0;
    const totalActiveDays = matchedUser.userCalendar?.totalActiveDays || 0;

    // Get badge count
    const badgeCount = matchedUser.badges?.length || 0;

    return NextResponse.json({
      username,
      name: matchedUser.profile?.realName || username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      totalSolved,
      easyCount,
      mediumCount,
      hardCount,
      topLanguages,
      streak,
      totalActiveDays,
      badgeCount,
      bio: matchedUser.profile?.aboutMe || "",
      school: matchedUser.profile?.school || "",
      skillTags: matchedUser.profile?.skillTags || [],
    });
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch LeetCode stats",
        message: error instanceof Error ? error.message : "Unknown error",
        // Placeholder data for development
        fallback: {
          username: "tFt4QC7qdx",
          totalSolved: 0,
          easyCount: 0,
          mediumCount: 0,
          hardCount: 0,
          topLanguages: [],
          streak: 0,
          badgeCount: 0,
        }
      },
      { status: 500 }
    );
  }
}
