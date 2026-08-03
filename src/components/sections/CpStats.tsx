"use client";

import { useEffect, useState } from "react";

interface CpState {
  cfRating: string;
  cfRank: string;
  cfSolved: string;
  ccRating: string;
  ccStars: string;
  acSolved: string;
  lcSolved: string;
  lcEasy: string;
  lcMed: string;
  lcHard: string;
  updatedAt: string;
}

const PLACEHOLDER: CpState = {
  cfRating: "--",
  cfRank: "Loading...",
  cfSolved: "--",
  ccRating: "1470",
  ccStars: "1★",
  acSolved: "12",
  lcSolved: "42",
  lcEasy: "25",
  lcMed: "17",
  lcHard: "0",
  updatedAt: "",
};

export default function CpStats() {
  const [stats, setStats] = useState<CpState>(PLACEHOLDER);

  async function load() {
    const s = { ...PLACEHOLDER };
    const now = new Date().toLocaleString();

    // Codeforces
    try {
      const info = await fetch("https://codeforces.com/api/user.info?handles=masudul2002").then((r) => r.json());
      if (info?.result?.[0]) {
        const u = info.result[0];
        s.cfRating = String(u.rating ?? "--");
        s.cfRank = u.rank ?? "Loading...";
      }
      const status = await fetch("https://codeforces.com/api/user.status?handle=masudul2002").then((r) => r.json());
      if (Array.isArray(status?.result)) {
        const solved = new Set();
        status.result.forEach((sub: { problem?: { contestId?: number; index?: string } }) => {
          if (sub.problem) solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
        });
        s.cfSolved = String(solved.size);
      }
    } catch (e) {
      console.error("Codeforces fetch failed:", e);
    }

    // AtCoder
    try {
      const ac = await fetch("https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=masudul2002").then((r) => r.json());
      if (ac && typeof ac.count === "number") s.acSolved = String(ac.count);
    } catch (e) {
      console.error("AtCoder fetch failed:", e);
    }

    // CodeChef
    try {
      const cc = await fetch("https://codechef-api.vercel.app/masudul2002").then((r) => r.json());
      if (cc && cc.rating !== undefined) {
        s.ccRating = String(cc.rating ?? "1470");
        s.ccStars = cc.stars ?? "1★";
      }
    } catch (e) {
      console.error("CodeChef fetch failed:", e);
    }

    // LeetCode
    try {
      const lc = await fetch("https://alfa-leetcode-api.onrender.com/masudul2002/solved").then((r) => r.json());
      if (lc) {
        s.lcSolved = String(lc.totalSolved ?? "42");
        s.lcEasy = String(lc.easySolved ?? "25");
        s.lcMed = String(lc.mediumSolved ?? "17");
        s.lcHard = String(lc.hardSolved ?? "0");
      }
    } catch (e) {
      console.error("LeetCode fetch failed:", e);
    }

    s.updatedAt = now;
    setStats(s);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const card = "glass-card vibe-card p-5 rounded-xl border border-glass-border hover:border-primary/60 transition-all group relative overflow-hidden block";
  const glow = "absolute top-0 right-0 w-20 h-20 rounded-full blur-xl group-hover:opacity-100 transition-all";

  return (
    <section id="cp" className="py-24 bg-black/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-trophy text-primary"></i> Competitive Programming
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <i className="fas fa-chart-line text-primary text-2xl"></i>
            <h3 className="text-2xl font-bold">Competitive Programming</h3>
            <button onClick={load} title="Refresh stats"
              className="ml-auto cursor-pointer text-gray-500 hover:text-primary transition-colors text-sm flex items-center gap-1">
              <i className="fas fa-sync-alt"></i> Refresh
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="glass-card vibe-card p-5 border border-glass-border rounded-xl hover:border-primary/50 transition-all group bg-[#0f1523]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a233a] flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0 border border-gray-700/30">
                  <i className="fas fa-code text-[#4b8bee] text-xl"></i>
                </div>
                <h4 className="text-white font-bold text-lg leading-tight">Overview</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-primary mt-1 leading-none">▹</span><span>Solved more than 100 problems in different online judges</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1 leading-none">▹</span><span>Newbie (max 903) in Codeforces</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1 leading-none">▹</span><span>Participation in 2 onsite contests</span></li>
              </ul>
            </div>

            <div className="glass-card vibe-card p-5 border border-glass-border rounded-xl hover:border-yellow-500/50 transition-all group bg-[#0f1523]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a233a] flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors flex-shrink-0 border border-gray-700/30">
                  <i className="fas fa-trophy text-[#4b8bee] text-xl"></i>
                </div>
                <h4 className="text-white font-bold text-lg leading-tight">Achievements</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-primary mt-1 leading-none">▹</span><span>1st in SSTU Inter Department Programming Contest 2025</span></li>
              </ul>
            </div>

            <div className="glass-card vibe-card p-5 border border-glass-border rounded-xl hover:border-purple-500/50 transition-all group bg-[#0f1523]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a233a] flex items-center justify-center group-hover:bg-purple-500/20 transition-colors flex-shrink-0 border border-gray-700/30">
                  <i className="fas fa-medal text-[#4b8bee] text-xl"></i>
                </div>
                <h4 className="text-white font-bold text-lg leading-tight">Participations</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-primary mt-1 leading-none">▹</span><span>ICPC Dhaka Regional 2025</span></li>
              </ul>
            </div>
          </div>

          {/* Platform Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Codeforces */}
            <a href="https://codeforces.com/profile/MASUDUL2002" target="_blank" rel="noopener" className={`${card} hover:border-primary/60`}>
              <div className={`${glow} bg-primary/5 group-hover:bg-primary/15`}></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.google.com/s2/favicons?sz=64&domain=codeforces.com" alt="CF" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-mono">Codeforces</p>
                  <p className="text-xs text-gray-400">MASUDUL2002</p>
                </div>
                <i className="fas fa-external-link-alt text-gray-600 group-hover:text-primary transition-colors text-xs ml-auto"></i>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-primary">{stats.cfRating}</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Rating</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-white">{stats.cfSolved}</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Solved</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center capitalize font-mono">{stats.cfRank}</p>
            </a>

            {/* CodeChef */}
            <a href="https://www.codechef.com/users/masudul2002" target="_blank" rel="noopener" className={`${card} hover:border-orange-500/60`}>
              <div className={`${glow} bg-orange-500/5 group-hover:bg-orange-500/15`}></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.google.com/s2/favicons?sz=64&domain=codechef.com" alt="CC" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-mono">CodeChef</p>
                  <p className="text-xs text-gray-400">masudul2002</p>
                </div>
                <i className="fas fa-external-link-alt text-gray-600 group-hover:text-orange-400 transition-colors text-xs ml-auto"></i>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-orange-400">{stats.ccRating}</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Rating</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-white">{stats.ccStars}</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Stars</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-gray-300">15+</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Solved</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 text-center font-mono">codechef.com</p>
            </a>

            {/* AtCoder */}
            <a href="https://atcoder.jp/users/masudul2002" target="_blank" rel="noopener" className={`${card} hover:border-gray-400/60`}>
              <div className={`${glow} bg-gray-500/5 group-hover:bg-gray-500/15`}></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gray-500/10 flex items-center justify-center group-hover:bg-gray-500/20 transition-colors overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.google.com/s2/favicons?sz=64&domain=atcoder.jp" alt="AC" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-mono">AtCoder</p>
                  <p className="text-xs text-gray-400">masudul2002</p>
                </div>
                <i className="fas fa-external-link-alt text-gray-600 group-hover:text-gray-300 transition-colors text-xs ml-auto"></i>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-gray-100">{stats.acSolved}</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">AC</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-gray-300">7</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Rating</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-lg font-black text-gray-400">235K</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Rank</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 text-center font-mono">atcoder.jp</p>
            </a>

            {/* HackerRank */}
            <a href="https://www.hackerrank.com/MASUDUL2002" target="_blank" rel="noopener" className={`${card} hover:border-green-500/60`}>
              <div className={`${glow} bg-green-500/5 group-hover:bg-green-500/15`}></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.google.com/s2/favicons?sz=64&domain=hackerrank.com" alt="HR" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-mono">HackerRank</p>
                  <p className="text-xs text-gray-400">MASUDUL2002</p>
                </div>
                <i className="fas fa-external-link-alt text-gray-600 group-hover:text-green-400 transition-colors text-xs ml-auto"></i>
              </div>
              <div className="mb-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono mb-2">Practicing Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-green-900/40 text-green-400 border border-green-500/30 px-2 py-1 rounded font-mono">Problem Solving</span>
                  <span className="text-[10px] bg-blue-900/40 text-blue-400 border border-blue-500/30 px-2 py-1 rounded font-mono">Python</span>
                  <span className="text-[10px] bg-yellow-900/40 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded font-mono">SQL</span>
                  <span className="text-[10px] bg-gray-800/60 text-gray-400 border border-gray-600/30 px-2 py-1 rounded font-mono">C</span>
                  <span className="text-[10px] bg-orange-900/40 text-orange-400 border border-orange-500/30 px-2 py-1 rounded font-mono">Java</span>
                </div>
              </div>
              <p className="text-[10px] text-green-500/70 font-mono flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Active on HackerRank
              </p>
            </a>

            {/* LeetCode */}
            <a href="https://leetcode.com/u/masudul2002" target="_blank" rel="noopener" className={`${card} hover:border-yellow-500/60`}>
              <div className={`${glow} bg-yellow-500/5 group-hover:bg-yellow-500/15`}></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://leetcode.com/favicon-192x192.png" alt="LeetCode" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-mono">LeetCode</p>
                  <p className="text-xs text-gray-400">masudul2002</p>
                </div>
                <i className="fas fa-external-link-alt text-gray-600 group-hover:text-yellow-400 transition-colors text-xs ml-auto"></i>
              </div>
              <div className="bg-black/30 rounded-lg p-3 mb-3 text-center">
                <p className="text-2xl font-black text-yellow-400">{stats.lcSolved}</p>
                <p className="text-[10px] text-gray-500 uppercase mt-0.5">Total Solved</p>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                <div className="bg-green-900/30 rounded px-1 py-1.5">
                  <p className="text-green-400 font-bold text-sm">{stats.lcEasy}</p>
                  <p className="text-gray-500">Easy</p>
                </div>
                <div className="bg-yellow-900/30 rounded px-1 py-1.5">
                  <p className="text-yellow-400 font-bold text-sm">{stats.lcMed}</p>
                  <p className="text-gray-500">Med</p>
                </div>
                <div className="bg-red-900/30 rounded px-1 py-1.5">
                  <p className="text-red-400 font-bold text-sm">{stats.lcHard}</p>
                  <p className="text-gray-500">Hard</p>
                </div>
              </div>
            </a>

            {/* VJudge */}
            <a href="https://vjudge.net/user/masudul2002" target="_blank" rel="noopener" className={`${card} hover:border-purple-500/60`}>
              <div className={`${glow} bg-purple-500/5 group-hover:bg-purple-500/15`}></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.google.com/s2/favicons?sz=64&domain=vjudge.net" alt="VJ" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-mono">VJudge</p>
                  <p className="text-xs text-gray-400">masudul2002</p>
                </div>
                <i className="fas fa-external-link-alt text-gray-600 group-hover:text-purple-400 transition-colors text-xs ml-auto"></i>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-purple-400">45</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Solved</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-white">45</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Attempted</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <p className="text-lg font-black text-gray-300">130K</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-0.5">Rank</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 text-center font-mono">vjudge.net</p>
            </a>
          </div>

          {/* Target banner */}
          <div className="mt-5 glass-card rounded-xl border border-primary/20 p-4 flex items-center gap-4 bg-primary/5">
            <i className="fas fa-bullseye text-primary text-xl flex-shrink-0"></i>
            <div>
              <p className="font-bold text-sm">Target: ICPC 2026</p>
              <p className="text-gray-400 text-xs">
                Practicing daily on Codeforces · LeetCode · AtCoder. Focused on algorithmic problem solving, DP, and graph theory.
              </p>
            </div>
            {stats.updatedAt && (
              <span className="ml-auto text-[10px] text-gray-600 font-mono whitespace-nowrap hidden md:block">
                Updated: {stats.updatedAt}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
