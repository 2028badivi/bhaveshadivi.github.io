'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { resumeData } from '@/lib/data';
import { asciiBanner } from '@/lib/terminal-data';

type Line = {
  id?: number;
  content: React.ReactNode;
  isCommand?: boolean;
};

function formatProjects() {
  return resumeData.projects.map((p, i) => (
    <div key={i} className="mb-6">
      <div className="text-green-300 font-bold">{`> ${p.title}`}</div>
      <div className="text-green-500/70 ml-4 text-xs">{p.location}</div>
      <div className="text-green-400/90 ml-4">{p.role}</div>
      <div className="text-green-500/60 ml-4 text-xs">{p.date}</div>
      {p.points.map((pt, j) => (
        <div key={j} className="text-green-300/70 ml-8 mt-1">- {pt}</div>
      ))}
    </div>
  ));
}

function renderExperience() {
  return resumeData.experience.map((e, i) => (
    <div key={i} className="mb-5">
      <div className="text-green-300 font-bold">{e.title}</div>
      <div className="text-green-400/90 ml-4">{e.role}</div>
      <div className="text-green-500/60 ml-4 text-xs">{e.date}</div>
      <div className="text-green-500/60 ml-4 text-xs">{e.location}</div>
      {e.points.map((pt, j) => (
        <div key={j} className="text-green-300/60 ml-8 mt-1">- {pt}</div>
      ))}
    </div>
  ));
}

function renderSkills() {
  return (
    <div className="space-y-2">
      {resumeData.skillsAndHonors.map((s, i) => (
        <div key={i} className="flex gap-3">
          <span className="text-green-500/60">●</span>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}

function renderEducation() {
  const e = resumeData.education;
  return (
    <div className="space-y-2">
      <div className="text-green-300 font-bold">{e.school}</div>
      <div className="text-green-400/80">{e.location}</div>
      <div className="text-green-400/80">{e.graduation}</div>
      {e.notables && <div className="text-green-300/60 mt-2">{e.notables}</div>}
    </div>
  );
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { content: asciiBanner, isCommand: false },
    { content: <span className="text-green-500/60">Welcome to bhavesh@terminal ~ $ Type <span className="text-green-300 font-bold">help</span> to get started.</span>, isCommand: false },
    { content: '', isCommand: false },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(100);

  const commands = {
    help: {
      desc: 'Show available commands',
      fn: () => (
        <pre className="text-green-300 whitespace-pre-wrap">
{`╔══════════════════════════════════════════════╗
║             AVAILABLE COMMANDS              ║
╚══════════════════════════════════════════════╝`}
{commandsText.map(([cmd, desc]) => `  ${cmd.padEnd(14)} ${desc}`).join('\n')}
        </pre>
      ),
    },
    whoami: {
      desc: 'Display user information',
      fn: () => (
        <div className="space-y-1">
          <div>name: <span className="text-green-300 font-bold">Bhavesh Adivi</span></div>
          <div>role: <span className="text-green-300">High School Sophomore @ TJHSST</span></div>
          <div>focus: <span className="text-green-300">Computational Biomedicine / AI / Engineering</span></div>
          <div>status: <span className="text-green-300">building things that matter</span></div>
        </div>
      ),
    },
    about: {
      desc: 'About me',
      fn: () => <div className="text-green-300/90 leading-relaxed">{resumeData.summary}</div>,
    },
    education: {
      desc: 'Education background',
      fn: () => renderEducation(),
    },
    projects: {
      desc: 'List research & projects',
      fn: () => formatProjects(),
    },
    experience: {
      desc: 'Work & volunteer experience',
      fn: () => renderExperience(),
    },
    skills: {
      desc: 'Skills & honors',
      fn: () => renderSkills(),
    },
    contact: {
      desc: 'Contact information',
      fn: () => (
        <div className="space-y-1">
          <div>email:  <span className="text-green-300 underline underline-offset-2"><a href="mailto:2028badivi@tjhsst.edu" className="hover:text-green-200">2028badivi@tjhsst.edu</a></span></div>
          <div>github: <span className="text-green-300 underline underline-offset-2"><a href="https://github.com/bhaveshadivi" target="_blank" className="hover:text-green-200">github.com/bhaveshadivi</a></span></div>
          <div>linkedin: <span className="text-green-300 underline underline-offset-2"><a href="https://www.linkedin.com/in/bhavesh-adivi/" target="_blank" className="hover:text-green-200">linkedin.com/in/bhavesh-adivi</a></span></div>
        </div>
      ),
    },
    banner: {
      desc: 'Show ASCII banner',
      fn: () => asciiBanner,
    },
    clear: {
      desc: 'Clear the terminal',
      fn: () => null,
    },
    health: {
      desc: 'System health check',
      fn: () => (
        <div className="space-y-1 text-xs">
          <div>[ OK ]  Kernel: bhavesh@brain v4.2.1</div>
          <div>[ OK ]  CPU: Massively parallel curiosity cores</div>
          <div>[ OK ]  Memory: 1e12+ synaptic weights allocated</div>
          <div>[ OK ]  Network: Connected to TJHSST / VCU / Georgetown</div>
          <div>[ OK ]  Projects: {resumeData.projects.length} active research threads</div>
          <div>[ OK ]  Uptime: ~16 years since boot</div>
        </div>
      ),
    },
    ls: {
      desc: 'List directories',
      fn: () => (
        <div className="space-x-6">
          <span className="text-blue-400">projects/</span>
          <span className="text-blue-400">experience/</span>
          <span className="text-blue-400">education/</span>
          <span className="text-green-300">skills</span>
          <span className="text-green-300">contact</span>
        </div>
      ),
    },
    pwd: {
      desc: 'Show current path',
      fn: () => <span className="text-green-500/60">~/bhavesh/terminal</span>,
    },
    date: {
      desc: 'Show current date & time',
      fn: () => <span>{new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })} EST</span>,
    },
  };

  const commandsText: [string, string][] = Object.entries(commands).map(([cmd, val]) => [cmd, val.desc]);

  const addLine = useCallback((content: React.ReactNode, isCommand = false) => {
    setLines(prev => [...prev, { content, isCommand, id: nextId.current++ }]);
  }, []);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    addLine(`$ ${trimmed}`, true);

    if (trimmed.toLowerCase() === 'clear') {
      setLines([{ content: asciiBanner, isCommand: false, id: nextId.current++ }]);
      return;
    }

    const parts = trimmed.split(/\s+/);
    const baseCmd = parts[0].toLowerCase();

    if (baseCmd in commands) {
      const result = commands[baseCmd as keyof typeof commands].fn();
      if (result) addLine(result);
    } else {
      addLine(<span className="text-red-400/80">command not found: <span className="text-red-300">{baseCmd}</span>. Try <span className="text-green-400">help</span>.</span>);
    }
  }, [addLine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHistory(prev => [...prev, input.trim()]);
    setHistoryIdx(-1);
    processCommand(input.trim());
    setInput('');
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) {
        setInput('');
        return;
      }
      const newIdx = historyIdx + 1;
      if (newIdx >= history.length) {
        setHistoryIdx(-1);
        setInput('');
        return;
      }
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const idx = selectedSuggestion >= 0 ? selectedSuggestion : 0;
        setInput(suggestions[idx]);
        setSuggestions([]);
        setSelectedSuggestion(-1);
      } else {
        const partial = input.trim().toLowerCase();
        if (!partial) return;
        const matches = Object.keys(commands).filter(c => c.startsWith(partial));
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          setSuggestions(matches);
          setSelectedSuggestion(-1);
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const val = e.target.value.trim().toLowerCase();
    if (val) {
      setSuggestions(Object.keys(commands).filter(c => c.startsWith(val) && c !== val));
    } else {
      setSuggestions([]);
    }
    setSelectedSuggestion(-1);
  };

  // Scroll output container to bottom on every render that adds lines
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [lines]);

  // Also scroll when DOM is mutated (catches renders where lines array didn't change ref)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      el.scrollTop = el.scrollHeight;
    });
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="flex-1 flex flex-col border border-green-500/20 rounded-sm bg-black/90"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header bar — fixed, doesn't scroll */}
      <div className="flex items-center shrink-0 gap-2 px-4 py-2 border-b border-green-500/20 bg-zinc-950 select-none">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_4px_rgba(234,179,8,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]" />
        </div>
        <span className="text-green-500/40 text-[10px] tracking-wider uppercase ml-3">zsh</span>
      </div>

      {/* Terminal output — this is the scrollable part */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-1.5 scroll-smooth"
      >
        {lines.map((line, i) => (
          <div key={line.id || i} className="whitespace-pre-wrap break-words leading-relaxed text-sm">
            {line.content}
          </div>
        ))}
      </div>

      {/* Suggestion bar */}
      {suggestions.length > 0 && (
        <div className="shrink-0 px-4 py-1 border-t border-green-500/10 bg-green-500/5 text-xs text-green-500/60 flex gap-4">
          {suggestions.map((s, i) => (
            <span key={s} className={`cursor-pointer ${i === selectedSuggestion ? 'text-green-300 underline' : ''}`}>{s}</span>
          ))}
        </div>
      )}

      {/* Input line — fixed, doesn't scroll */}
      <form onSubmit={handleSubmit} className="flex shrink-0 items-center gap-0 border-t border-green-500/10 px-4 py-2.5 bg-black/80">
        <span className="text-green-400 font-bold shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => inputRef.current?.focus(), 10)}
          className="flex-1 bg-transparent border-none outline-none text-green-300 ml-2 caret-green-400 font-mono text-sm placeholder-green-500/30"
          placeholder="type help..."
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <span className="w-2 h-5 bg-green-400 animate-[blink_1s_step-end_infinite]" />
      </form>
    </div>
  );
}