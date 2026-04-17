"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TechGalleryItem {
  name: string;
  subtitle: string;
  accent: string;
  logo: ReactNode;
}

interface ScrollTechGalleryProps {
  items: TechGalleryItem[];
  className?: string;
}

export function ScrollTechGallery({ items, className }: ScrollTechGalleryProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollable = Math.max(sectionHeight - viewportHeight, 1);
      const progress = Math.min(Math.max((window.scrollY - sectionTop) / scrollable, 0), 1);
      const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);

      setTranslateX(-progress * maxTranslate);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={cn("relative min-h-[240vh] w-full", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">Tech Stack</p>
              <h3 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">
                Scroll through the tools behind the work
              </h3>
            </div>
            <p className="hidden text-sm text-white/35 md:block">
              Drag mentally, scroll physically
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-2xl">
            <div
              ref={trackRef}
              className="flex w-max gap-4 md:gap-5 will-change-transform"
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
              }}
            >
              {items.map((item) => (
                <article
                  key={item.name}
                  className="group relative w-[260px] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/85 p-5 shadow-xl md:w-[300px]"
                >
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-1.5",
                      item.accent
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      {item.logo}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                      language
                    </span>
                  </div>

                  <div className="mt-6 space-y-2">
                    <h4 className="text-2xl font-semibold tracking-tight text-white">{item.name}</h4>
                    <p className="text-sm leading-relaxed text-white/60">{item.subtitle}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-2 text-[10px] uppercase tracking-[0.25em] text-white/45">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">Projects</div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">Research</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
