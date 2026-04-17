'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalLanding } from '@/components/ui/personal-landing';
import { StardustButton } from '@/components/ui/stardust-button';
import { HeroDeviceDemo } from '@/components/ui/hero-device-demo';
import { IntroScreen } from '@/components/intro-screen';
import { resumeData } from '@/lib/data';
import { 
  GraduationCap, 
  Code, 
  MapPin,
  Atom,
  Cpu,
  Microscope,
  Binary,
} from 'lucide-react';

function GitHubMark({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-1.04-.01-1.89-2.78.59-3.37-1.22-3.37-1.22-.46-1.18-1.12-1.49-1.12-1.49-.91-.63.07-.62.07-.62 1.01.07 1.55 1.06 1.55 1.06.9 1.56 2.36 1.11 2.93.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.11-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 6.8c.85 0 1.7.12 2.5.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.21 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.31.67.92.67 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.59.69.48A10.26 10.26 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="bg-black text-white min-h-screen selection:bg-primary selection:text-white">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen key="intro-screen" onComplete={() => setShowIntro(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            {/* HERO SECTION */}
            <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden w-full">
              <HeroDeviceDemo />
            </section>

            {/* PERSONAL LANDING */}
            <PersonalLanding />

            {/* SUMMARY / ABOUT */}
            <section id="about" className="py-32 px-4 max-w-6xl mx-auto relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                 <div className="md:col-span-4 sticky top-32">
                    <div className="space-y-6">
                      <h2 className="text-4xl font-bold tracking-tighter flex items-center gap-3">
                         <Microscope className="text-primary" />
                         Philosophy
                      </h2>
                      <div className="h-1 w-20 bg-primary/20" />
                    </div>
                 </div>
                <div className="md:col-span-8">
                    <p className="text-2xl md:text-4xl text-white/90 leading-tight font-medium tracking-tight">
                      {resumeData.summary}
                    </p>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                      {[
                        { icon: Cpu, label: "AI & ML" },
                        { icon: Binary, label: "CS+Data" },
                        { icon: Atom, label: "Quantum" },
                        { icon: Microscope, label: "Biotech" }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                          <item.icon className="text-white/35" size={26} />
                          <span className="text-[10px] items-center text-center uppercase tracking-widest text-white/40">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                 </div>
               </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="py-32 px-4 bg-white/[0.01] border-y border-white/5 relative z-10">
               <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                  <div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 flex items-center gap-6">
                      <Code className="text-primary/40 size-12 md:size-20" />
                      RESEARCH
                    </h2>
                  </div>
                  <StardustButton type="button" icon={<GitHubMark className="size-4" />}>
                    github
                  </StardustButton>
                </div>

                <div className="space-y-6">
                  {resumeData.projects.map((project, idx) => (
                    <motion.div
                      key={idx}
                      className="border border-white/10 bg-zinc-950/40 p-6 md:p-8"
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                        <div className="text-white/85 font-semibold tracking-tight">
                          <span className="text-primary/70 font-mono mr-2">{">"}</span>
                          <span className="font-bold">{project.title}</span>
                          <span className="text-white/40"> — </span>
                          <span>{project.role}</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                          {project.date}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
               </div>
            </section>

            {/* SKILLS CARDS */}
            <section className="py-32 px-4 relative z-10 overflow-hidden">
               <div className="max-w-7xl mx-auto">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Education */}
                    <div className="lg:col-span-1 space-y-12">
                      <div className="p-10 border border-white/10 bg-gradient-to-br from-zinc-900 to-black relative group">
                        <GraduationCap className="absolute -right-6 -bottom-6 text-white/5 size-40 rotate-[-15deg] group-hover:rotate-0 transition-transform duration-1000" />
                        <h3 className="text-3xl font-bold mb-4">{resumeData.education.school}</h3>
                        <p className="text-white/40 text-xs flex items-center gap-2 font-mono uppercase tracking-widest italic relative z-10">
                          <MapPin size={12} /> {resumeData.education.location}
                        </p>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="lg:col-span-2 space-y-12">
                      <ul className="space-y-4">
                        {resumeData.skillsAndHonors.map((skill, idx) => (
                          <li key={idx} className="text-white/70 text-sm md:text-base leading-relaxed flex gap-3">
                            <span className="text-primary/70 font-mono">{">"}</span>
                            <span className="font-semibold tracking-tight">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>
               </div>
            </section>

            {/* FOOTER */}
            <footer className="py-40 px-4 border-t border-white/10 bg-zinc-950">
               <div className="max-w-5xl mx-auto text-center space-y-16">
                 <div className="space-y-4">
                   <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic">Stay <span className="text-primary">Curious</span></h2>
                 </div>
                 
                 <div className="flex flex-wrap justify-center gap-8">
                    <a href="mailto:2028badivi@tjhsst.edu">
                      <StardustButton type="button">Contact Me</StardustButton>
                    </a>
                    <a href="https://www.linkedin.com/in/bhavesh-adivi/" target="_blank" rel="noreferrer">
                      <StardustButton type="button">connect</StardustButton>
                    </a>
                 </div>
               </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
