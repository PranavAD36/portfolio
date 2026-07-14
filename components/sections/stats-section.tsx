"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Github, Code2, Zap } from "lucide-react";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      current = Math.min(frame * increment, end);
      setCount(Math.floor(current));

      if (frame >= steps) {
        setCount(end);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-cyan-400 font-mono">
        {count.toLocaleString()}
        <span className="text-lg md:text-xl ml-1">{suffix}</span>
      </div>
      <p className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
};

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

interface GithubStatsProps {
  data?: {
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    topLanguages: Array<{ language: string; count: number }>;
    profileUrl: string;
    name?: string;
  };
  loading?: boolean;
  error?: boolean;
}

interface LeetCodeStatsProps {
  data?: {
    totalSolved: number;
    easyCount: number;
    mediumCount: number;
    hardCount: number;
    topLanguages: Array<{ language: string; count: number }>;
    streak: number;
    badgeCount: number;
    profileUrl: string;
  };
  loading?: boolean;
  error?: boolean;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({
  icon,
  label,
  value,
  color,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05, translateY: -5 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className={`group relative p-4 md:p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 overflow-hidden cursor-default ${color}`}
  >
    {/* Glassmorphism background */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Content */}
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
          {icon}
        </div>
        <p className="text-xs md:text-sm text-gray-300 uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-2xl md:text-3xl font-bold text-white font-mono">{value}</p>
    </div>

    {/* Hover effect border */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  </motion.div>
);

const GithubStatsSection: React.FC<GithubStatsProps> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="mt-4 text-gray-400 text-sm">Loading GitHub stats...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
        <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
        <p className="text-red-400 text-sm text-center">Failed to load GitHub stats. Please try again later.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Github className="w-6 h-6 text-white" />
        <h3 className="text-2xl md:text-3xl font-bold text-white">GitHub Statistics</h3>
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto px-4 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          View Profile
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Counter end={data.publicRepos} label="Repositories" />
        <Counter end={data.followers} label="Followers" />
        <Counter end={data.following} label="Following" />
        <Counter end={data.totalStars} label="Stars" suffix="⭐" />
      </div>

      {/* Top Languages */}
      {data.topLanguages && data.topLanguages.length > 0 && (
        <div className="mt-8">
          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Top Languages</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {data.topLanguages.map((lang, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all text-center group cursor-default"
              >
                <p className="text-xs font-mono text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {lang.language}
                </p>
                <p className="text-lg font-bold text-white mt-2">{lang.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const LeetCodeStatsSection: React.FC<LeetCodeStatsProps> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
        <p className="mt-4 text-gray-400 text-sm">Loading LeetCode stats...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
        <AlertCircle className="w-8 h-8 text-yellow-400 mb-2" />
        <p className="text-yellow-400 text-sm text-center">Failed to load LeetCode stats. Please try again later.</p>
      </div>
    );
  }

  const difficultyStats = [
    { label: "Easy", count: data.easyCount, color: "text-green-400" },
    { label: "Medium", count: data.mediumCount, color: "text-yellow-400" },
    { label: "Hard", count: data.hardCount, color: "text-red-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Code2 className="w-6 h-6 text-orange-400" />
        <h3 className="text-2xl md:text-3xl font-bold text-white">LeetCode Progress</h3>
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto px-4 py-2 text-xs font-bold bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors border border-orange-500/50"
        >
          Visit Profile
        </a>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Counter end={data.totalSolved} label="Problems Solved" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="flex gap-2 justify-center">
            {difficultyStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className={`text-sm font-bold ${stat.color}`}>{stat.count}</p>
                <p className="text-[10px] text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <Counter end={data.streak} label="Current Streak" suffix="🔥" />
        <Counter end={data.badgeCount} label="Badges" suffix="🏆" />
      </div>

      {/* Top Languages */}
      {data.topLanguages && data.topLanguages.length > 0 && (
        <div className="mt-8">
          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Most Used Languages</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {data.topLanguages.map((lang, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 hover:border-orange-400/50 transition-all text-center group cursor-default"
              >
                <p className="text-xs font-mono text-orange-400 group-hover:text-orange-300 transition-colors">
                  {lang.language}
                </p>
                <p className="text-lg font-bold text-white mt-2">{lang.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function StatsSection() {
  const [githubStats, setGithubStats] = useState<any>(null);
  const [leetcodeStats, setLeetcodeStats] = useState<any>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [githubError, setGithubError] = useState(false);
  const [leetcodeError, setLeetcodeError] = useState(false);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        setGithubLoading(true);
        const response = await fetch("/api/github-stats");
        if (!response.ok) throw new Error("Failed to fetch GitHub stats");
        const data = await response.json();
        setGithubStats(data);
        setGithubError(false);
      } catch (err) {
        console.error("GitHub stats error:", err);
        setGithubError(true);
      } finally {
        setGithubLoading(false);
      }
    };

    fetchGithubStats();
  }, []);

  useEffect(() => {
    const fetchLeetcodeStats = async () => {
      try {
        setLeetcodeLoading(true);
        const response = await fetch("/api/leetcode-stats");
        if (!response.ok) throw new Error("Failed to fetch LeetCode stats");
        const data = await response.json();
        setLeetcodeStats(data);
        setLeetcodeError(false);
      } catch (err) {
        console.error("LeetCode stats error:", err);
        setLeetcodeError(true);
      } finally {
        setLeetcodeLoading(false);
      }
    };

    fetchLeetcodeStats();
  }, []);

  return (
    <section id="stats" className="w-full py-20 bg-black overflow-hidden relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_40%)]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk mb-4">
            MISSION CONTROL
          </h2>
          <p className="text-cyan-500/80 text-sm font-mono tracking-widest uppercase">
            [ LIVE CODING STATISTICS ]
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Real-time data from GitHub & LeetCode</span>
          </div>
        </motion.div>

        {/* GitHub Section */}
        <div className="mb-16 p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-cyan-400/30 transition-all duration-300">
          <GithubStatsSection data={githubStats} loading={githubLoading} error={githubError} />
        </div>

        {/* LeetCode Section */}
        <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-orange-400/30 transition-all duration-300">
          <LeetCodeStatsSection data={leetcodeStats} loading={leetcodeLoading} error={leetcodeError} />
        </div>

        {/* Divider note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-500 mt-12 font-mono"
        >
          [ DATA UPDATED HOURLY ]
        </motion.p>
      </div>
    </section>
  );
}
