"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface LeetCodeData {
  totalSolved: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  streak: number;
  profileUrl: string;
}

interface GitHubData {
  username: string;
  graphUrl: string;
  profileUrl: string;
  name: string;
  avatar: string;
}

// Skeleton Loader
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-white/10 rounded-lg w-1/3"></div>
    <div className="space-y-3">
      <div className="h-32 bg-white/10 rounded-lg"></div>
    </div>
  </div>
);

// Error Card
const ErrorCard = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-8 rounded-2xl border border-red-500/30 bg-red-500/5 flex flex-col items-center justify-center min-h-[300px]"
  >
    <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
    <p className="text-center text-red-300 text-sm leading-relaxed">{message}</p>
  </motion.div>
);

// LeetCode Stats Card
const LeetCodeCard = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mission-control/leetcode");
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        if (result.error) throw new Error(result.error);
        setData(result);
      } catch (err) {
        setError("Unable to load data.\nPlease try again later.");
        console.error("LeetCode fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorCard message={error} />;
  if (!data) return <ErrorCard message="Unable to load data.\nPlease try again later." />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      <Link href={data.profileUrl} target="_blank" rel="noopener noreferrer">
        <div className="p-8 md:p-10 rounded-2xl backdrop-blur-md border border-white/10 hover:border-orange-400/50 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/0 overflow-hidden cursor-pointer">
          {/* Background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">LeetCode Stats</h3>
              <div className="h-1 w-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
            </div>

            {/* Circular Ring Style - Streak at top */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Circular ring visualization */}
              <div className="flex-1 flex justify-center">
                <div className="relative w-40 h-40 md:w-48 md:h-48">
                  {/* Circular progress ring */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                    {/* Background circle */}
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
                    {/* Progress circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="3"
                      strokeDasharray={`${(data.totalSolved / 3000) * (2 * Math.PI * 90)} ${2 * Math.PI * 90}`}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-white font-mono mb-1">
                        {data.totalSolved}
                      </div>
                      <div className="text-xs md:text-sm text-gray-400 uppercase tracking-widest">Solved</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                {/* Streak Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="col-span-2 p-4 rounded-xl bg-orange-500/20 border border-orange-400/50 text-center group/badge hover:bg-orange-500/30 hover:border-orange-400/80 transition-all"
                >
                  <div className="text-xs text-orange-300 uppercase tracking-widest mb-1">Current Streak</div>
                  <div className="text-3xl font-bold text-orange-400 font-mono">{data.streak} 🔥</div>
                </motion.div>

                {/* Easy */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-400/30 text-center group/stat hover:bg-green-500/20 hover:border-green-400/50 transition-all"
                >
                  <div className="text-xs text-green-400 uppercase tracking-widest mb-1">Easy</div>
                  <div className="text-2xl font-bold text-white font-mono">{data.easyCount}</div>
                </motion.div>

                {/* Medium */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-400/30 text-center group/stat hover:bg-yellow-500/20 hover:border-yellow-400/50 transition-all"
                >
                  <div className="text-xs text-yellow-400 uppercase tracking-widest mb-1">Medium</div>
                  <div className="text-2xl font-bold text-white font-mono">{data.mediumCount}</div>
                </motion.div>

                {/* Hard */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-400/30 text-center group/stat hover:bg-red-500/20 hover:border-red-400/50 transition-all"
                >
                  <div className="text-xs text-red-400 uppercase tracking-widest mb-1">Hard</div>
                  <div className="text-2xl font-bold text-white font-mono">{data.hardCount}</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// GitHub Contribution Card
const GitHubCard = () => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mission-control/github");
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        if (result.error) throw new Error(result.error);
        setData(result);
      } catch (err) {
        setError("Unable to load data.\nPlease try again later.");
        console.error("GitHub fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorCard message={error} />;
  if (!data) return <ErrorCard message="Unable to load data.\nPlease try again later." />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="group relative"
    >
      <Link href={data.profileUrl} target="_blank" rel="noopener noreferrer">
        <div className="p-8 md:p-10 rounded-2xl backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/0 overflow-hidden cursor-pointer">
          {/* Background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">GitHub Contributions</h3>
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" />
            </div>

            {/* Graph */}
            <div className="overflow-x-auto pb-4">
              <img
                src={data.graphUrl}
                alt="GitHub Contribution Graph"
                className="w-full rounded-lg bg-white/5 p-2"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  const parent = img.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<div class="text-center text-gray-400 py-12">Contribution graph temporarily unavailable</div>';
                  }
                }}
              />
            </div>

            {/* Profile Link */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Profile</p>
              <p className="text-white font-mono text-sm hover:text-cyan-400 transition-colors">
                github.com/{data.username}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Main Mission Control Component
export default function MissionControl() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Mission Control</h2>
          <p className="text-gray-400 text-lg">Live coding statistics and contribution activity</p>
        </motion.div>

        {/* Two Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LeetCodeCard />
          <GitHubCard />
        </div>
      </div>
    </section>
  );
}
