"use client";

import { useEffect, useState } from "react";
import type { HTMLAttributes } from "react";

interface MacbookProps extends HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
}

const terminalFrames = [
  {
    prompt: "bhavesh@portfolio",
    path: "~/work",
    command: "npm run dev",
    output: "next dev ready at localhost:3000",
  },
  {
    prompt: "bhavesh@portfolio",
    path: "~/research",
    command: "python model.py",
    output: "training biomedical simulations...",
  },
  {
    prompt: "bhavesh@portfolio",
    path: "~/impact",
    command: 'git commit -m "ship ideas"',
    output: "pushing work that blends STEM + design",
  },
];

export function Macbook({
  subtitle = "Bio + AI + Biomedical Engineering",
  className = "",
  ...props
}: MacbookProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % terminalFrames.length);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`} {...props}>
      <div className="relative h-[320px] w-full max-w-[980px] scale-95 md:h-[340px] md:scale-100">
        <div className="absolute left-1/2 top-1/2 h-[12px] w-[180px] -translate-x-1/2 translate-y-[110px] rounded-full bg-black/40 blur-xl" />

        <div className="absolute left-1/2 top-1/2 h-[232px] w-[93%] -translate-x-1/2 -translate-y-[114px] rounded-[26px] border border-white/10 bg-gradient-to-br from-zinc-200 to-zinc-400 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:h-[242px] md:h-[252px] md:w-[89%]">
          <div className="absolute inset-[10px] overflow-hidden rounded-[20px] bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.28),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.15),transparent_30%),linear-gradient(135deg,#0b1020,#05070c)]" />
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.08)_100%)]" />
            <div className="relative z-10 grid h-full grid-cols-1 overflow-hidden sm:grid-cols-[minmax(190px,0.34fr)_minmax(0,0.66fr)]">
              <div className="border-b border-white/10 bg-[#0b1220]/90 p-4 text-white sm:border-b-0 sm:border-r sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>

                <div className="mb-5 space-y-3">
                  <div className="h-2 w-28 rounded-full bg-emerald-500/85 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]" />
                  <div className="h-2 w-40 rounded-full bg-white/10" />
                  <div className="h-2 w-36 rounded-full bg-white/10" />
                  <div className="h-2 w-32 rounded-full bg-white/10" />
                </div>

                <div className="font-mono text-[10px] leading-relaxed text-cyan-100/90 sm:text-[11px] md:text-[12px]">
                  <div className="text-white/45">
                    <span className="text-white/55">{terminalFrames[index].prompt}</span>{" "}
                    <span className="text-cyan-200/80">{terminalFrames[index].path}</span>{" "}
                    <span className="text-white/35">%</span>
                  </div>
                  <div className="mt-2 text-cyan-300">
                    <span className="text-white/35">$</span> {terminalFrames[index].command}
                  </div>
                  <div className="mt-2 text-cyan-100/75">
                    {terminalFrames[index].output}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-cyan-300">
                    <span className="text-white/35">%</span>
                    <span className="inline-block h-4 w-2 animate-pulse rounded-sm bg-cyan-200/80" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 px-5 py-6 text-white sm:px-6 md:px-10">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-200/75 sm:text-[11px]">
                    Welcome
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                    Bhavesh Adivi
                  </h3>
                  <p className="max-w-[24ch] text-sm text-white/75 sm:text-base md:text-lg">
                    {subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-[10px] sm:text-xs">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                    <span className="block text-white/45">Focus</span>
                    <span className="mt-1 block font-medium">Research + building</span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                    <span className="block text-white/45">Mode</span>
                    <span className="mt-1 block font-medium">Creative + analytical</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 top-[78%] h-[92px] w-[92%] -translate-x-1/2 rounded-[18px] bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-[0_12px_30px_rgba(0,0,0,0.35)] sm:w-[88%]">
          <div className="absolute inset-[12px] rounded-[12px] bg-gradient-to-b from-zinc-100 to-zinc-300" />
          <div className="absolute left-1/2 top-[52%] h-[8px] w-[80px] -translate-x-1/2 rounded-full bg-zinc-500/60" />
          <div className="absolute bottom-[12px] left-[18px] h-[5px] w-[5px] rounded-full bg-zinc-700" />
          <div className="absolute bottom-[12px] right-[18px] h-[5px] w-[5px] rounded-full bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}
