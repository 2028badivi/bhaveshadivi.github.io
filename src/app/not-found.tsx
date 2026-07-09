'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-4">
      <div className="max-w-xl w-full border border-green-500/20 rounded-sm p-6">
        <pre className="text-green-400 mb-4 text-xs md:text-sm leading-tight">
{`  _ __   ___  _ __ | |_ __ _
| '_ \\ / _ \\| '_ \\| __/ _\` |
| | | | (_) | | | | || (_| |
|_| |_|\\___/|_| |_|\\__\\__,_|`}
        </pre>
        <div className="text-green-300/80 mb-6">
          <div className="mb-2">
            <span className="text-green-500/60">$ </span>curl -s https://bhavesh.page/{404}
          </div>
          <div className="text-yellow-400/80">
            Error: 404 — Not Found{dots}
          </div>
          <div className="text-green-500/60 mt-2">
            The page you&apos;re looking for doesn&apos;t exist in this filesystem.
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors text-sm"
          >
            cd ~
          </Link>
          <button
            onClick={() => window.history.back()}
            className="text-green-500/60 hover:text-green-400 underline underline-offset-2 transition-colors text-sm"
          >
            cd ..
          </button>
        </div>
      </div>
    </div>
  );
}