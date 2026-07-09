'use client';

import { Terminal } from '@/components/terminal';

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-3 md:p-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <Terminal />
      </div>
    </main>
  );
}