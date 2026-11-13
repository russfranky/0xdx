import React from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import { PageHeader } from './ui/PageHeader';

interface MeetingMinutesProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export function MeetingMinutes({ onBack, theme, onThemeToggle }: MeetingMinutesProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <PageHeader onBack={onBack} title="Meeting Minutes" theme={theme} onThemeToggle={onThemeToggle} />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-black dark:text-white uppercase leading-[0.9]">
            Open <br /> by default
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 font-light leading-relaxed border-l-2 border-black dark:border-neutral-500 pl-6">
            Every committee meeting under the 0xdx framework is recorded, signed, and published. Once committees begin operating on testnet, their minutes will appear here.
          </p>
        </motion.div>

        <div className="border-2 border-black dark:border-neutral-600 p-12 md:p-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 border-2 border-black dark:border-neutral-600 flex items-center justify-center mb-8">
            <FileText className="w-7 h-7 text-black dark:text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 text-black dark:text-white">
            No meetings yet
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-md mb-8">
            0xdx is pre-launch. The first committees, proposals, and on-chain executions will appear here after testnet goes live.
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
            Status: pre-launch
          </p>
        </div>
      </main>
    </div>
  );
}
