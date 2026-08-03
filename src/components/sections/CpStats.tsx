"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

interface CfUser {
  handle: string;
  rating?: number;
  rank?: string;
}

interface CpState {
  cfRating: string;
  cfRank: string;
  cfSolved: string;
  acSolved: string;
  ccRating: string;
  ccStars: string;
  lcSolved: string;
  lcEasy: string;
  lcMedium: string;
  lcHard: string;
  lcRanking: string;
  updatedAt: string;
}

const PLACEHOLDER: CpState = {
  cfRating: "—",
  cfRank: "—",
  cfSolved: "—",
  acSolved: "—",
  ccRating: "—",
  ccStars: "—",
  lcSolved: "—",
  lcEasy: "—",
  lcMedium: "—",
  lcHard: "—",
  lcRanking: "—",
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
        const u: CfUser = info.result[0];
        s.cfRating = String(u.rating ?? "—");
        s.cfRank = u.rank ?? "—";
      }
      const status = await fetch("https://codeforces.com/api/user.status?handle=masudul2002").then((r) => r.json());
      if (Array.isArray(status?.result)) {
        const solved = new Set();
        (status.result as Array<{ problem?: { contestId?: number; index?: string } }>).forEach((sub) => {
          if (sub.problem) solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
        });
        s.cfSolved = String(solved.size);
      }
    } catch (e) {
      console.error("Codeforces fetch failed:", e);
    }

    // AtCoder (kenkoooo)
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
        s.ccRating = String(cc.rating ?? "—");
        s.ccStars = cc.stars ?? "";
      }
    } catch (e) {
      console.error("CodeChef fetch failed:", e);
    }

    // LeetCode
    try {
      const lc = await fetch("https://alfa-leetcode-api.onrender.com/masudul2002/solved").then((r) => r.json());
      if (lc) {
        s.lcSolved = String(lc.totalSolved ?? "—");
        s.lcEasy = String(lc.easySolved ?? "—");
        s.lcMedium = String(lc.mediumSolved ?? "—");
        s.lcHard = String(lc.hardSolved ?? "—");
        s.lcRanking = lc.ranking ? `#${lc.ranking}` : "";
      }
    } catch (e) {
      console.error("LeetCode fetch failed:", e);
    }

    s.updatedAt = now;
    setStats(s);
  }

  useEffect(() => {
    // Fetching live stats from external APIs — a legitimate effect use
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const card =
    "rounded-xl bg-glass-bg border border-glass-border p-6 text-center hover:border-primary/40 transition-colors";

  return (
    <section id="cp-stats" className="py-20 px-4 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Competitive Programming" title="Live Stats" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className={card}>
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.google.com/s2/favicons?sz=64&domain=codeforces.com" alt="" className="w-5 h-5" />
            <h3 className="font-semibold text-white text-sm">Codeforces</h3>
          </div>
          <p className="text-2xl font-bold text-primary">{stats.cfRating}</p>
          <p className="text-xs text-gray-400 capitalize mt-1">{stats.cfRank}</p>
          <p className="text-xs text-gray-500 mt-1">Solved: {stats.cfSolved}</p>
        </div>

        <div className={card}>
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.google.com/s2/favicons?sz=64&domain=atcoder.jp" alt="" className="w-5 h-5" />
            <h3 className="font-semibold text-white text-sm">AtCoder</h3>
          </div>
          <p className="text-2xl font-bold text-primary">{stats.acSolved}</p>
          <p className="text-xs text-gray-400 mt-1">Solved</p>
        </div>

        <div className={card}>
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.google.com/s2/favicons?sz=64&domain=codechef.com" alt="" className="w-5 h-5" />
            <h3 className="font-semibold text-white text-sm">CodeChef</h3>
          </div>
          <p className="text-2xl font-bold text-primary">{stats.ccRating}</p>
          <p className="text-xs text-gray-400 mt-1">{stats.ccStars}</p>
        </div>

        <div className={card}>
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.google.com/s2/favicons?sz=64&domain=leetcode.com" alt="" className="w-5 h-5" />
            <h3 className="font-semibold text-white text-sm">LeetCode</h3>
          </div>
          <p className="text-2xl font-bold text-primary">{stats.lcSolved}</p>
          <p className="text-xs text-gray-400 mt-1">Solved</p>
          <p className="text-[10px] text-gray-500 mt-1">
            E{stats.lcEasy} · M{stats.lcMedium} · H{stats.lcHard}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-8">
        <p className="text-xs text-gray-500">
          {stats.updatedAt ? <>Last updated: {stats.updatedAt}</> : "Loading…"}
        </p>
        <button
          onClick={load}
          className="bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
        >
          <i className="fas fa-rotate-right mr-1.5"></i>Refresh
        </button>
      </div>
    </section>
  );
}