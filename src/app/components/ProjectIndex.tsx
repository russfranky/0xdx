import React from 'react';
import { motion } from 'motion/react';
import { Compass } from 'lucide-react';
import { PageHeader } from './ui/PageHeader';

interface ProjectIndexProps {
  onBack: () => void;
  onProjectClick: (id: number) => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export function ProjectIndex({ onBack, theme, onThemeToggle }: ProjectIndexProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <PageHeader onBack={onBack} title="Ecosystem" theme={theme} onThemeToggle={onThemeToggle} />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-black dark:text-white uppercase leading-[0.9]">
            Ecosystem
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 font-light leading-relaxed border-l-2 border-black dark:border-neutral-500 pl-6">
            Protocols and organizations governed by the 0xdx framework will be listed here once mainnet launches.
          </p>
        </motion.div>

        <div className="border-2 border-black dark:border-neutral-600 p-12 md:p-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 border-2 border-black dark:border-neutral-600 flex items-center justify-center mb-8">
            <Compass className="w-7 h-7 text-black dark:text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 text-black dark:text-white">
            No live projects yet
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-md">
            0xdx is pre-launch. The ecosystem index activates after the framework is deployed and the first organizations adopt it. Read the litepaper to learn how to participate.
          </p>
        </div>
      </main>
    </div>
  );
}
