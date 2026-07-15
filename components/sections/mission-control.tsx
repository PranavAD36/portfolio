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

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-5">
    <div className="h-8 w-40 rounded-lg bg-white/10" />
    <div className="space-y-4">
      <div className="h-[420px] rounded-2xl bg-white/10" />
    </div>
  </div>
);

const ErrorCard = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/5 p-8"
  >
    <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
    <p className="whitespace-pre-line text-center text-sm leading-relaxed text-red-300">
      {message}
    </p>
  </motion.div>
);

const LeetCodeCard = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mission-control/leetcode");

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const result = await response.json();

        if (result.error) {
          throw new Error(result.error);
        }

        setData(result);
      } catch (err) {
        console.error("LeetCode fetch error:", err);
        setError("Unable to load data.\nPlease try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorCard message={error} />;
  if (!data) {
    return <ErrorCard message={"Unable to load data.\nPlease try again later."} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative h-full"
    >
      <Link
        href={data.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="relative flex h-full min-h-[620px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur-md transition-all duration-300 hover:border-orange-400/50 sm:p-7 md:p-8 lg:min-h-[640px] lg:p-8 xl:p-9">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-6 sm:mb-7">
              <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                LeetCode Stats
              </h3>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
            </div>

            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="flex w-full justify-center lg:w-[45%]">
                  <div className="relative h-48 w-48 sm:h-52 sm:w-52">
                    <svg
                      className="h-full w-full -rotate-90"
                      viewBox="0 0 200 200"
                    >
                      <defs>
                        <linearGradient
                          id="progressGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#fb923c" />
                          <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                      </defs>

                      <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="8"
                      />

                      <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${
                          (data.totalSolved / 3000) * (2 * Math.PI * 90)
                        } ${2 * Math.PI * 90}`}
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <h4 className="font-mono text-4xl font-bold text-white sm:text-5xl">
                        {data.totalSolved}
                      </h4>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-gray-400">
                        Problems Solved
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-4 lg:w-[50%] lg:gap-5">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-orange-400/40 bg-orange-500/15 p-4 text-center transition-all duration-300 hover:border-orange-400 hover:bg-orange-500/20 sm:p-5"
                  >
                    <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-orange-300">
                      Current Streak
                    </p>
                    <h4 className="text-3xl font-bold text-orange-400 sm:text-4xl">
                      🔥 {data.streak}
                    </h4>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="flex min-h-[96px] flex-col items-center justify-center rounded-xl border border-green-400/30 bg-green-500/10 p-4 text-center transition-all duration-300 hover:border-green-400/60 hover:bg-green-500/20"
                    >
                      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-green-400">
                        Easy
                      </p>
                      <h4 className="font-mono text-2xl font-bold text-white sm:text-3xl">
                        {data.easyCount}
                      </h4>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="flex min-h-[96px] flex-col items-center justify-center rounded-xl border border-yellow-400/30 bg-yellow-500/10 p-4 text-center transition-all duration-300 hover:border-yellow-400/60 hover:bg-yellow-500/20"
                    >
                      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-yellow-400">
                        Medium
                      </p>
                      <h4 className="font-mono text-2xl font-bold text-white sm:text-3xl">
                        {data.mediumCount}
                      </h4>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex min-h-[96px] flex-col items-center justify-center rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-center transition-all duration-300 hover:border-red-400/60 hover:bg-red-500/20"
                    >
                      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-red-400">
                        Hard
                      </p>
                      <h4 className="font-mono text-2xl font-bold text-white sm:text-3xl">
                        {data.hardCount}
                      </h4>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const GitHubCard = () => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mission-control/github");

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const result = await response.json();

        if (result.error) {
          throw new Error(result.error);
        }

        setData(result);
      } catch (err) {
        console.error("GitHub fetch error:", err);
        setError("Unable to load data.\nPlease try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorCard message={error} />;
  if (!data) {
    return <ErrorCard message={"Unable to load data.\nPlease try again later."} />;
  }

  const graphSrc = (() => {
    const providedUrl = data.graphUrl?.trim();

    if (!providedUrl) {
      return "";
    }

    if (
      providedUrl.includes("github-readme-activity-graph") ||
      providedUrl.includes("ghchart")
    ) {
      return providedUrl;
    }

    return `https://github-readme-activity-graph.vercel.app/graph?username=${encodeURIComponent(data.username)}&theme=react-dark&bg_color=00000000&color=38bdf8&line=22d3ee&point=fb923c&area=true&hide_border=true`;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="group relative h-full"
    >
      <Link
        href={data.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="relative flex h-full min-h-[620px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 sm:p-7 md:p-8 lg:min-h-[640px] lg:p-8 xl:p-9">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-6 sm:mb-7">
              <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                GitHub Contributions
              </h3>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600" />
            </div>

            <div className="flex flex-1 items-center justify-center py-2">
              <div className="flex w-full max-w-[760px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                {graphSrc ? (
                  <img
                    src={graphSrc}
                    alt="GitHub Contribution Graph"
                    className="mx-auto h-auto w-full max-w-full rounded-lg object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = "none";

                      const parent = img.parentElement;

                      if (parent) {
                        parent.innerHTML =
                          '<div class="flex h-[220px] items-center justify-center text-center text-sm text-gray-400">Contribution graph temporarily unavailable</div>';
                      }
                    }}
                  />
                ) : (
                  <div className="flex h-[220px] items-center justify-center text-center text-sm text-gray-400">
                    Contribution graph temporarily unavailable
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5 sm:mt-7 sm:pt-6">
              <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-gray-400">
                GitHub Profile
              </p>
              <p className="font-mono text-sm text-white transition-colors duration-300 group-hover:text-cyan-400 sm:text-base">
                github.com/{data.username}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function MissionControl() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Mission Control
          </h2>

          <p className="text-lg text-gray-400">
            Live coding statistics and contribution activity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <LeetCodeCard />
          <GitHubCard />
        </div>
      </div>
    </section>
  );
}
