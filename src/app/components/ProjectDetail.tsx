import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
}

export function ProjectDetail({ onBack }: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Ecosystem
          </button>
          <div className="w-20" />
        </div>
      </header>
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Project not found</h1>
        <p className="text-neutral-600 font-light">No live projects are listed yet. Check back after mainnet launch.</p>
      </main>
    </div>
  );
}
