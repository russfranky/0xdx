import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  onBack: () => void;
  title: string;
  backLabel?: string;
  rightSlot?: React.ReactNode;
}

export function PageHeader({
  onBack,
  title,
  backLabel = 'Back to Home',
  rightSlot,
}: PageHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 min-h-11 px-2 -ml-2 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </button>

        <div className="flex items-baseline gap-2 min-w-0">
          <span className="text-lg font-bold text-black dark:text-white tracking-tighter shrink-0">0xdx</span>
          <span className="text-neutral-300 dark:text-neutral-700 shrink-0" aria-hidden="true">/</span>
          <span className="font-bold tracking-tight uppercase text-black dark:text-white truncate">{title}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {rightSlot}
        </div>
      </div>
    </header>
  );
}
