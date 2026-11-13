import React from 'react';
import { PageHeader } from './ui/PageHeader';

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
}

export function ProjectDetail({ onBack }: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans flex flex-col selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <PageHeader onBack={onBack} title="Ecosystem" backLabel="Back to Ecosystem" />
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight mb-4 text-black dark:text-white">Project not found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 font-light">No live projects are listed yet. Check back after mainnet launch.</p>
      </main>
    </div>
  );
}
