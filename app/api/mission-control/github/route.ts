import { NextResponse } from "next/server";

interface ContributionCell {
  date: string;
  level: number;
}

export async function GET() {
  try {
    const username = "PranavAD36";

    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` })
      },
      next: { revalidate: 3600 }
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: userResponse.status });
    }

    const userData = await userResponse.json();

    const contributionPage = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html,application/xhtml+xml"
      },
      next: { revalidate: 3600 }
    });

    if (!contributionPage.ok) {
      throw new Error(`GitHub contribution page error: ${contributionPage.status}`);
    }

    const html = await contributionPage.text();
    const cells = parseContributionCells(html);

    if (cells.length === 0) {
      throw new Error("No contribution calendar data was found.");
    }

    const totalContributions = parseContributionTotal(html);
    const svgGraph = generateContributionSVG(cells, totalContributions);
    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgGraph)}`;

    return NextResponse.json({
      username,
      graphUrl: svgDataUrl,
      profileUrl: `https://github.com/${username}`,
      name: userData.name || username,
      avatar: userData.avatar_url,
      contributionsCount: totalContributions
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: "Unable to load GitHub data" }, { status: 500 });
  }
}

function parseContributionCells(html: string): ContributionCell[] {
  const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
  const matches = Array.from(html.matchAll(regex));

  return matches.map((match) => ({
    date: match[1],
    level: Number(match[2])
  }));
}

function parseContributionTotal(html: string): number {
  const match = html.match(/(\d+)\s+contributions\s+in the last year/i);
  return match ? Number(match[1]) : 0;
}

function generateContributionSVG(cells: ContributionCell[], totalContributions: number): string {
  const width = 900;
  const height = 220;
  const cellSize = 12;
  const cellGap = 3;
  const startX = 40;
  const startY = 45;
  const weeks = Math.max(52, Math.ceil(cells.length / 7));

  const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

  const rows = Math.ceil(cells.length / 7);
  const svgRows = Math.max(7, rows);
  const svgHeight = Math.max(height, startY + svgRows * (cellSize + cellGap) + 20);

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${svgHeight}" viewBox="0 0 ${width} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${svgHeight}" fill="#0d1117" rx="12" />
  <text x="${startX}" y="24" fill="#8b949e" font-size="12" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">${totalContributions} contributions in the last year</text>
  <text x="${startX}" y="${startY - 12}" fill="#c9d1d9" font-size="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">GitHub contribution activity</text>
`;

  for (let index = 0; index < cells.length; index += 1) {
    const week = Math.floor(index / 7);
    const day = index % 7;
    const x = startX + week * (cellSize + cellGap);
    const y = startY + day * (cellSize + cellGap);
    const level = Math.min(Math.max(cells[index].level, 0), 4);

    svg += `  <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="${colors[level]}" />\n`;
  }

  const legendY = startY + 7 * (cellSize + cellGap) + 18;
  svg += `  <text x="${startX}" y="${legendY}" fill="#8b949e" font-size="11" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">Less</text>\n`;

  ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].forEach((color, idx) => {
    const legendX = startX + 36 + idx * 16;
    svg += `  <rect x="${legendX}" y="${legendY - 10}" width="10" height="10" rx="2" fill="${color}" />\n`;
  });

  svg += `  <text x="${startX + 36 + 5 * 16}" y="${legendY}" fill="#8b949e" font-size="11" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">More</text>\n`;
  svg += `</svg>`;

  return svg;
}
