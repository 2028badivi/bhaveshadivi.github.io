"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const images = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop",
];

const images2 = [
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=400&h=400&fit=crop",
];

function ScrambleButton() {
  const [displayText, setDisplayText] = useState("Read More");
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const originalText = "Read More";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = originalText.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(originalText);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <button
      onMouseEnter={scramble}
      className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
    >
      {displayText}
    </button>
  );
}

export function HeroWithMarquee() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 text-white md:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        {/* Left Content */}
        <div className="space-y-8 lg:pl-4">
          <h2 className="max-w-[7ch] text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl md:text-7xl lg:text-[7rem]">
            The Future of Creative Design
          </h2>
          <div className="space-y-2 text-lg text-white/50 md:text-2xl">
            <p>March 2025</p>
            <p>Design Studio</p>
          </div>
          <ScrambleButton />
        </div>

        {/* Right Marquee Grid */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent" />
          <div className="space-y-5 md:space-y-6 lg:mr-[-12rem]">
            <Marquee speed={28} reverse className="[--gap:1.25rem]">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative h-40 w-40 shrink-0 overflow-hidden rounded-[1.8rem] bg-white/5 sm:h-48 sm:w-48 lg:h-56 lg:w-56"
                >
                  <Image
                    src={src}
                    alt={`Image ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 160px, (max-width: 1200px) 192px, 224px"
                    className="object-cover"
                  />
                </div>
              ))}
            </Marquee>
            <Marquee speed={28} className="[--gap:1.25rem]">
              {images2.map((src, idx) => (
                <div
                  key={idx}
                  className="relative h-40 w-40 shrink-0 overflow-hidden rounded-[1.8rem] bg-white/5 sm:h-48 sm:w-48 lg:h-56 lg:w-56"
                >
                  <Image
                    src={src}
                    alt={`Image ${idx + 5}`}
                    fill
                    sizes="(max-width: 768px) 160px, (max-width: 1200px) 192px, 224px"
                    className="object-cover"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
