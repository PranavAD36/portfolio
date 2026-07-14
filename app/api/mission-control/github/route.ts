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

    // Generate SVG contribution graph server-side
    const svgGraph = generateContributionSVG();
    
    // Convert SVG to data URL
    const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svgGraph).toString('base64')}`;

    const profileUrl = `https://github.com/${username}`;

    return NextResponse.json({
      username,
      graphUrl: svgDataUrl,
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

// Generate a beautiful SVG contribution graph
function generateContributionSVG(): string {
  const width = 1000;
  const height = 180;
  const cellSize = 12;
  const cellGap = 2;
  const weeks = 52;
  const days = 7;
  
  // Color palette (dark theme)
  const colors = [
    '#0d1117', // background
    '#10b981', // low
    '#059669', // medium
    '#047857', // high
    '#065f46'  // very high
  ];

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .contribution-cell { cursor: pointer; }
      .contribution-cell:hover { opacity: 0.8; }
      .contribution-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 12px; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${colors[0]}" />
  
  <!-- Day labels -->
  <text x="0" y="20" class="contribution-label" fill="#6e7681">Mon</text>
  <text x="0" y="50" class="contribution-label" fill="#6e7681">Wed</text>
  <text x="0" y="80" class="contribution-label" fill="#6e7681">Fri</text>
  
  <!-- Month labels -->
  <text x="35" y="15" class="contribution-label" fill="#6e7681" font-size="11">Jan</text>
  <text x="120" y="15" class="contribution-label" fill="#6e7681" font-size="11">Feb</text>
  <text x="205" y="15" class="contribution-label" fill="#6e7681" font-size="11">Mar</text>
  <text x="290" y="15" class="contribution-label" fill="#6e7681" font-size="11">Apr</text>
  <text x="375" y="15" class="contribution-label" fill="#6e7681" font-size="11">May</text>
  <text x="460" y="15" class="contribution-label" fill="#6e7681" font-size="11">Jun</text>
  <text x="545" y="15" class="contribution-label" fill="#6e7681" font-size="11">Jul</text>
  <text x="630" y="15" class="contribution-label" fill="#6e7681" font-size="11">Aug</text>
  <text x="715" y="15" class="contribution-label" fill="#6e7681" font-size="11">Sep</text>
  <text x="800" y="15" class="contribution-label" fill="#6e7681" font-size="11">Oct</text>
  <text x="885" y="15" class="contribution-label" fill="#6e7681" font-size="11">Nov</text>
  <text x="960" y="15" class="contribution-label" fill="#6e7681" font-size="11">Dec</text>
  
  <!-- Contribution cells -->`;

  const startX = 40;
  const startY = 30;

  // Generate random contribution data for visual effect
  // In production, this would use real data from GitHub API
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < days; day++) {
      const x = startX + week * (cellSize + cellGap);
      const y = startY + day * (cellSize + cellGap);
      
      // Create a pattern of contributions (based on week and day)
      const contribution = Math.floor(Math.random() * 5);
      const colorIndex = Math.min(contribution, colors.length - 1);
      const color = colors[colorIndex];
      
      svg += `\n  <rect class="contribution-cell" x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}" rx="2" stroke="#1c2128" stroke-width="0.5" />`;
    }
  }

  svg += `\n</svg>`;
  
  return svg;
}
