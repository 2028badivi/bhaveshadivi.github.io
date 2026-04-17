"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import CubeAnimation from "@/components/ui/cube-animation";
import { CardsParallax, type iCardItem } from "@/components/ui/cards-parallax";

interface SocialLink {
  href: string;
  label: string;
  icon: ReactNode;
  bg: string;
  text: string;
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true" fill="currentColor">
      <path d="M6.94 6.5a2.05 2.05 0 1 1-4.1 0 2.05 2.05 0 0 1 4.1 0Zm.06 3.5H3V21h4V10Zm6.36 0H9.5V21h3.84v-5.46c0-1.43.27-2.8 2.02-2.8 1.73 0 1.75 1.62 1.75 2.89V21H21v-6.07c0-2.98-.64-5.27-4.12-5.27-1.67 0-2.79.92-3.24 1.79h-.04V10Z" />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-1.04-.01-1.89-2.78.59-3.37-1.22-3.37-1.22-.46-1.18-1.12-1.49-1.12-1.49-.91-.63.07-.62.07-.62 1.01.07 1.55 1.06 1.55 1.06.9 1.56 2.36 1.11 2.93.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.11-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 6.8c.85 0 1.7.12 2.5.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.21 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.31.67.92.67 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.59.69.48A10.26 10.26 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

const socialLinks: SocialLink[] = [
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: <LinkedInMark />,
    bg: "bg-sky-600",
    text: "text-white",
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: <GitHubMark />,
    bg: "bg-zinc-800",
    text: "text-white",
  },
];

function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center text-center gap-6">
      <div className="relative mb-2">
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400 opacity-50 blur-xl animate-glow" />
        <Image
          src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
          alt="avatar"
          width={128}
          height={128}
          className="relative size-32 rounded-full border-4 border-zinc-800 shadow-2xl z-10 bg-zinc-950 object-cover"
        />
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg">
        Hi, I&apos;m Bhavesh
      </h1>
      <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-medium">
        I am a research-driven aspiring physician-scientist working at the intersection of Human-centric Engineering and Biomathematics.
      </p>
    </section>
  );
}

function SocialsBlock() {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className={twMerge(
            "flex items-center gap-2 rounded-full border border-zinc-800 px-7 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-opacity-90",
            link.bg,
            link.text
          )}
          style={{ minWidth: 140, minHeight: 56 }}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
        >
          {link.icon}
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}

function SimpleIconMark({
  slug,
  color,
  alt,
  className = "",
}: {
  slug: string;
  color: string;
  alt: string;
  className?: string;
}) {
  return (
    // Simple Icons CDN returns SVGs, so a native img keeps the logos crisp and lightweight.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt={alt}
      className={twMerge("h-9 w-9 object-contain", className)}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

const skills = [
  { name: "Design", level: 95 },
  { name: "Development", level: 90 },
  { name: "Branding", level: 85 },
  { name: "Motion", level: 78 },
  { name: "Strategy", level: 82 },
];

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full max-w-md flex-col">
      <div className="flex flex-col gap-1">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={cn(
                "relative flex items-center justify-between rounded-lg px-4 py-5 -mx-4 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                hoveredIndex === index ? "bg-white/[0.04]" : "bg-transparent"
              )}
            >
              <div className="relative flex items-center gap-4">
                <div
                  className={cn(
                    "h-5 w-0.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    hoveredIndex === index
                      ? "bg-white scale-y-100 opacity-100"
                      : "bg-zinc-700 scale-y-50 opacity-0"
                  )}
                />

                <span
                  className={cn(
                    "text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    hoveredIndex === index
                      ? "text-white translate-x-0"
                      : "text-zinc-400 -translate-x-5"
                  )}
                >
                  {skill.name}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative h-1 w-24 overflow-hidden rounded-full bg-zinc-800/70">
                  <div className="absolute inset-0 bg-zinc-700/40" />
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-zinc-200 to-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    )}
                    style={{
                      width: hoveredIndex === index ? `${skill.level}%` : "0%",
                      transitionDelay: hoveredIndex === index ? "100ms" : "0ms",
                    }}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out",
                      hoveredIndex === index ? "translate-x-full" : "-translate-x-full"
                    )}
                    style={{
                      transitionDelay: hoveredIndex === index ? "300ms" : "0ms",
                    }}
                  />
                </div>

                <div className="relative w-10 overflow-hidden">
                  <span
                    className={cn(
                      "block text-sm font-mono tabular-nums text-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      hoveredIndex === index
                        ? "text-white opacity-100 translate-y-0 blur-0"
                        : "text-zinc-500 opacity-0 translate-y-3 blur-sm"
                    )}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>

            {index < skills.length - 1 && (
              <div
                className={cn(
                  "mx-4 h-px transition-all duration-500",
                  hoveredIndex === index || hoveredIndex === index + 1
                    ? "bg-transparent"
                    : "bg-white/10"
                )}
              />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

type TechBadge = {
  name: string;
  slug: string;
  color: string;
  alt: string;
};

const techRows: TechBadge[][] = [
  [
    { name: "Python", slug: "python", color: "3776AB", alt: "Python logo" },
    { name: "TypeScript", slug: "typescript", color: "3178C6", alt: "TypeScript logo" },
    { name: "JavaScript", slug: "javascript", color: "F7DF1E", alt: "JavaScript logo" },
    { name: "React", slug: "react", color: "61DAFB", alt: "React logo" },
  ],
  [
    { name: "Next.js", slug: "nextdotjs", color: "FFFFFF", alt: "Next.js logo" },
    { name: "Node.js", slug: "nodedotjs", color: "339933", alt: "Node.js logo" },
    { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4", alt: "Tailwind CSS logo" },
    { name: "Git", slug: "git", color: "F05032", alt: "Git logo" },
  ],
  [
    { name: "GitHub", slug: "github", color: "FFFFFF", alt: "GitHub logo" },
    { name: "Docker", slug: "docker", color: "2496ED", alt: "Docker logo" },
    { name: "PostgreSQL", slug: "postgresql", color: "4169E1", alt: "PostgreSQL logo" },
    { name: "Prisma", slug: "prisma", color: "2D3748", alt: "Prisma logo" },
  ],
  [
    { name: "MongoDB", slug: "mongodb", color: "47A248", alt: "MongoDB logo" },
    { name: "Supabase", slug: "supabase", color: "3FCF8E", alt: "Supabase logo" },
    { name: "Firebase", slug: "firebase", color: "FFCA28", alt: "Firebase logo" },
    { name: "Vercel", slug: "vercel", color: "FFFFFF", alt: "Vercel logo" },
  ],
  [
    { name: "GraphQL", slug: "graphql", color: "E10098", alt: "GraphQL logo" },
    { name: "Jest", slug: "jest", color: "C21325", alt: "Jest logo" },
    { name: "Vitest", slug: "vitest", color: "6E9F18", alt: "Vitest logo" },
    { name: "Playwright", slug: "playwright", color: "2EAD33", alt: "Playwright logo" },
  ],
  [
    { name: "OpenAI", slug: "openai", color: "FFFFFF", alt: "OpenAI logo" },
    { name: "Linux", slug: "linux", color: "FCC624", alt: "Linux logo" },
    { name: "Bash", slug: "gnubash", color: "4EAA25", alt: "Bash logo" },
    { name: "Figma", slug: "figma", color: "F24E1E", alt: "Figma logo" },
  ],
];

function TechGrid() {
  return (
    <section className="w-full">
      <div className="grid gap-3 sm:gap-4">
        {techRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {row.map((item) => (
              <div
                key={item.name}
                className="group flex items-center gap-3 py-2 transition-colors duration-200"
              >
                <SimpleIconMark
                  slug={item.slug}
                  color={item.color}
                  alt={item.alt}
                  className="h-7 w-7 grayscale brightness-75 transition-all duration-200 group-hover:grayscale-0 group-hover:brightness-100 sm:h-8 sm:w-8"
                />
                <span
                  className="text-sm font-medium tracking-tight text-zinc-500 transition-colors duration-200 group-hover:text-white"
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function AsciiSignal() {
  return (
    <div className="flex w-full justify-center py-2 md:py-4">
      <div className="max-w-full overflow-x-auto px-2 text-cyan-200/90 animate-ascii-drift">
        <CubeAnimation />
      </div>
    </div>
  );
}

const parallaxItems: iCardItem[] = [
  {
    title: "KeyCog",
    description: "ML-based CICI detection via keystroke dynamics analysis",
    tag: "bio",
    link: "#",
    color: "#0b1020",
    textColor: "#e6f3ff",
    src: "/keycog_logo_landing%20copy.png",
  },
  {
    title: "CodeTheCure",
    description: "RAG-powered oncology info access for patients",
    tag: "ai",
    link: "#",
    color: "#101225",
    textColor: "#ffffff",
    src: "/ctc_logo%20copy.png",
  },
  {
    title: "Juniper",
    description: "symptom-aware task planning",
    tag: "stem",
    link: "#",
    color: "#0d1422",
    textColor: "#e2e8f0",
    src: "/thangf.png",
  },
];

function GallerySection() {
  return (
    <section className="w-full">
      <CardsParallax items={parallaxItems} />
    </section>
  );
}

export function PersonalLanding() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-zinc-950 via-black to-zinc-950 px-4 py-20 text-zinc-50 md:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute -top-32 -left-32 z-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400 opacity-15 blur-3xl animate-pulse-slow" />
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-12">
        <HeroSection />
        <SocialsBlock />
        <AsciiSignal />
        <TechGrid />
        <Skills />
        <GallerySection />
      </div>
    </section>
  );
}
