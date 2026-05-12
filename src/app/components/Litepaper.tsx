import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download } from 'lucide-react';
import { PageHeader } from './ui/PageHeader';
import litepaperSource from '../../../0xdx_litepaper.md?raw';

interface LitepaperProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export function Litepaper({ onBack, theme, onThemeToggle }: LitepaperProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="print:hidden">
        <PageHeader
          onBack={onBack}
          title="Litepaper"
          theme={theme}
          onThemeToggle={onThemeToggle}
          rightSlot={
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              <Download className="w-4 h-4" /> Print
            </button>
          }
        />
      </div>

      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <article
          className="
            prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-black dark:prose-headings:text-white
            prose-h1:text-5xl prose-h1:md:text-6xl prose-h1:tracking-tighter prose-h1:leading-[1.05] prose-h1:mb-8
            prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-neutral-200 dark:prose-h2:border-neutral-700 prose-h2:pb-3
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:text-lg prose-p:text-neutral-800 dark:prose-p:text-neutral-200 prose-p:leading-relaxed prose-p:font-light
            prose-li:text-lg prose-li:text-neutral-800 dark:prose-li:text-neutral-200 prose-li:font-light
            prose-strong:text-black dark:prose-strong:text-white prose-strong:font-bold
            prose-a:text-black dark:prose-a:text-white prose-a:underline prose-a:underline-offset-4
            prose-blockquote:border-l-4 prose-blockquote:border-black dark:prose-blockquote:border-neutral-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-700 dark:prose-blockquote:text-neutral-300
            prose-code:text-black dark:prose-code:text-white prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:hidden prose-code:after:hidden
            prose-hr:my-12 prose-hr:border-neutral-200 dark:prose-hr:border-neutral-700
            prose-table:text-sm prose-th:text-left prose-th:font-bold
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {litepaperSource}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
