"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import NumberTicker from "@/components/ui/number-ticker";
import { ExternalLink, Github, Zap, Trophy, Calendar } from "lucide-react";
import RetroGrid from "@/components/ui/retro-grid";

// --- Types ---
interface GitHubData {
  total: { [year: string]: number };
  contributions: Array<{ date: string; count: number; level: number }>;
}

export default function CodingStats() {
  const [leetcodeData, setLeetcodeData] = useState<any>(null);
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ NEW: Year State (Default to current year 2026)
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Reset loading on year change
      try {
        // ✅ Dynamic GitHub Fetch based on selectedYear
        const ghResponse = await fetch(`https://github-contributions-api.jogruber.de/v4/PranavAD36?y=${selectedYear}`);
        const ghData = await ghResponse.json();
        setGithubData(ghData);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]); // ✅ Re-run when year changes

  const stats = leetcodeData || { 
    totalSolved: 0, 
    easySolved: 0, mediumSolved: 0, hardSolved: 0, 
    totalQuestions: 3000,
    submissionCalendar: {}
  };

  const calculateStroke = (solved: number, total: number, radius: number) => {
    const circumference = 2 * Math.PI * radius;
    const percentage = total > 0 ? (solved / total) * 100 : 0;
    return circumference - (percentage / 100) * circumference;
  };

  const getLeetCodeStreak = (calendar: any) => {
    if (!calendar) return 0;
    const timestamps = Object.keys(calendar).map(Number).sort((a, b) => b - a);
    if (timestamps.length === 0) return 0;
    let streak = 0;
    const oneDay = 24 * 60 * 60 * 1000;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // Logic handles basic streak, refined for simplicity here
    let lastSubDate = new Date(timestamps[0] * 1000);
    lastSubDate.setHours(0,0,0,0);
    const diff = (currentDate.getTime() - lastSubDate.getTime()) / oneDay;
    if (diff > 1) return 0; 
    for (let i = 0; i < timestamps.length; i++) {
        const date = new Date(timestamps[i] * 1000);
        date.setHours(0,0,0,0);
        const expectedDate = new Date(currentDate);
        expectedDate.setDate(currentDate.getDate() - streak - (diff === 0 ? 0 : 1));
        expectedDate.setHours(0,0,0,0);
        if (date.getTime() === expectedDate.getTime()) streak++;
        else if (date.getTime() < expectedDate.getTime()) break;
    }
    return streak;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // ✅ UPDATED: Robust Streak Logic
  const calculateGitHubStreak = () => {
    if (!githubData?.contributions) 
      return { current: 0, currentRange: "No Data", longest: 0, longestRange: "No Data", total: 0, totalRange: "" };
    
    const contribs = githubData.contributions; 
    const total = contribs.reduce((acc, day) => acc + day.count, 0); 
    
    const firstDate = contribs[0]?.date ? formatDate(contribs[0].date) : "";
    const lastDate = contribs[contribs.length - 1]?.date ? formatDate(contribs[contribs.length - 1].date) : "";

    // 1. Longest Streak Calculation (Standard)
    let maxStreak = 0;
    let tempStreak = 0;
    let maxStart = "";
    let maxEnd = "";
    let tempStart = "";
    let tempEnd = "";

    for (const day of contribs) {
        if (day.count > 0) {
            if (tempStreak === 0) tempStart = day.date;
            tempStreak++;
            tempEnd = day.date;
        } else {
            if (tempStreak > maxStreak) {
                maxStreak = tempStreak;
                maxStart = tempStart;
                maxEnd = tempEnd;
            }
            tempStreak = 0;
        }
    }
    // Check agar streak end tak chal rahi thi
    if (tempStreak > maxStreak) {
        maxStreak = tempStreak;
        maxStart = tempStart;
        maxEnd = tempEnd;
    }

    // 2. Current Streak (Smart Logic) 🧠
    const reversed = [...contribs].reverse(); // Newest first
    let currentStreak = 0;
    let startCreateDate = "";
    let endCreateDate = reversed[0].date; 
    
    // Logic: Kahan se ginti shuru karein?
    let i = 0;
    
    // Case A: Agar latest day (Aaj/Kal) mein contribution hai -> Start counting
    if (reversed[0].count > 0) {
        i = 0;
        endCreateDate = reversed[0].date;
    } 
    // Case B: Agar latest day 0 hai, lekin usse pehle wale din contribution tha -> Start from yesterday
    // (Matlab aaj chutti li hai, par streak zinda hai)
    else if (reversed.length > 1 && reversed[1].count > 0) {
        i = 1;
        endCreateDate = reversed[1].date;
    } 
    // Case C: Agar Aaj aur Kal dono 0 hain -> Streak toot gayi ❌
    else {
        i = -1; 
    }

    if (i !== -1) {
        for (; i < reversed.length; i++) {
            if (reversed[i].count > 0) {
                currentStreak++;
                startCreateDate = reversed[i].date;
            } else {
                break; // Streak break ho gayi
            }
        }
    }

    return { 
        current: currentStreak, 
        currentRange: currentStreak > 0 ? `${formatDate(startCreateDate)} - ${formatDate(endCreateDate)}` : "No active streak",
        longest: maxStreak, 
        longestRange: maxStreak > 0 ? `${formatDate(maxStart)} - ${formatDate(maxEnd)}` : "N/A",
        total, 
        totalRange: `${firstDate} - ${lastDate}`
    };
  };
  
  const ghStats = calculateGitHubStreak();

  return (
    <section id="stats" className="w-full py-20 bg-black relative z-10 overflow-hidden">
      
      <div className="absolute inset-0 z-0 h-full w-full">
         <RetroGrid className="opacity-100" />
      </div>

      <div className="text-center mb-16 relative z-20 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk">
          MISSION CONTROL
        </h2>
        <p className="text-cyan-500/80 mt-2 text-sm font-mono tracking-widest uppercase">
          [ LIVE DATA STREAM ]
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative z-20">
        
        {/* === LEFT: LEETCODE HUD === */}
        <div className="relative flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm shadow-2xl group min-h-[400px]">
          {/* ... (Same Leetcode Content) ... */}
          <div className="absolute top-6 left-6 flex items-center gap-2 z-30">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md">
                <span className="text-orange-500 text-sm">🔥</span>
                <span className="text-orange-400 text-xs font-mono font-bold">
                {getLeetCodeStreak(stats.submissionCalendar)} Day Streak
                </span>
            </div>
          </div>

          <motion.a 
            href="#" 
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-30"
            whileHover={{ scale: 1.1 }}
          >
            <ExternalLink size={20} />
          </motion.a>

          <h3 className="text-xl font-bold text-gray-200 mb-8 mt-8 md:mt-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/> LeetCode Stats
          </h3>
          
          <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none" stroke="#22d3ee" strokeWidth="8"
                strokeLinecap="round" strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: calculateStroke(stats.easySolved, stats.totalEasy || 800, 45) }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#1e293b" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="35" fill="none" stroke="#c026d3" strokeWidth="8"
                strokeLinecap="round" strokeDasharray="220"
                initial={{ strokeDashoffset: 220 }}
                animate={{ strokeDashoffset: calculateStroke(stats.mediumSolved, stats.totalMedium || 1600, 35) }}
                transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
              />
              <circle cx="50" cy="50" r="25" fill="none" stroke="#1e293b" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="25" fill="none" stroke="#f472b6" strokeWidth="8"
                strokeLinecap="round" strokeDasharray="157"
                initial={{ strokeDashoffset: 157 }}
                animate={{ strokeDashoffset: calculateStroke(stats.hardSolved, stats.totalHard || 600, 25) }}
                transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {loading ? (
                <span className="text-sm text-gray-400 animate-pulse">Scanning...</span>
              ) : (
                <>
                  <span className="text-4xl font-bold text-white">
                    <NumberTicker value={stats.totalSolved} />
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Solved</span>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 md:gap-4 mt-6 text-xs font-mono flex-wrap justify-center">
            <div className="flex items-center gap-1 text-gray-300"><div className="w-3 h-3 rounded bg-cyan-400"/> Easy: <span className="text-white font-bold">{stats.easySolved}</span></div>
            <div className="flex items-center gap-1 text-gray-300"><div className="w-3 h-3 rounded bg-purple-600"/> Med: <span className="text-white font-bold">{stats.mediumSolved}</span></div>
            <div className="flex items-center gap-1 text-gray-300"><div className="w-3 h-3 rounded bg-pink-400"/> Hard: <span className="text-white font-bold">{stats.hardSolved}</span></div>
          </div>
        </div>


        {/* === RIGHT: GITHUB GRAPH === */}
        <div className="relative flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden min-h-[400px]">
          
          <motion.a 
            href="https://github.com/PranavAD36" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 z-30"
            whileHover={{ scale: 1.1 }}
          >
            <Github size={20} />
          </motion.a>

          {/* ✅ YEAR SELECTOR BUTTONS */}
          <div className="absolute top-6 left-6 flex gap-2 z-30">
            {[2026, 2025].map((year) => (
                <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-full border transition-all ${
                        selectedYear === year 
                        ? "bg-green-500/20 text-green-400 border-green-500/50" 
                        : "bg-white/5 text-gray-500 border-white/10 hover:text-white"
                    }`}
                >
                    {year}
                </button>
            ))}
          </div>

          <h3 className="text-xl font-bold text-gray-200 mb-8 mt-12 md:mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> GitHub Activity ({selectedYear})
          </h3>
          
          <div className="w-full flex justify-center overflow-x-auto scale-95 md:scale-100 origin-center pb-4 scrollbar-hide">
            {/* ✅ Pass 'year' prop to display correct calendar */}
            <GitHubCalendar 
              username="PranavAD36" 
              year={selectedYear}
              blockSize={12} 
              blockMargin={4}
              fontSize={12}
              theme={{
                light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                dark: ['#1f2937', '#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd'],
              }}
              style={{ color: "white" }}
            />
          </div>
        </div>

      </div>

      {/* === BOTTOM: STATS === */}
      <div className="max-w-6xl mx-auto px-4 mt-10 relative z-20">
        <div className="p-6 md:p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm shadow-2xl">
           <h3 className="text-lg font-bold text-gray-200 mb-6 flex items-center justify-center gap-2 text-center">
            <Zap className="text-blue-400 fill-blue-400/20" size={20} /> 
            GitHub Performance ({selectedYear})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl font-bold text-white mb-2">
                <NumberTicker value={ghStats.total} />
              </span>
              <span className="text-[10px] text-gray-500 font-mono mt-1 mb-1">
                 {ghStats.totalRange}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} className="text-blue-400" />
                Contributions
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl font-bold text-white mb-2">
                <NumberTicker value={ghStats.current} />
              </span>
              <span className="text-[10px] text-gray-500 font-mono mt-1 mb-1">
                 {ghStats.currentRange}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Zap size={12} className="text-yellow-400" />
                Streak (Year End)
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl font-bold text-white mb-2">
                <NumberTicker value={ghStats.longest} />
              </span>
              <span className="text-[10px] text-gray-500 font-mono mt-1 mb-1">
                 {ghStats.longestRange}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Trophy size={12} className="text-purple-400" />
                Longest Streak
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}