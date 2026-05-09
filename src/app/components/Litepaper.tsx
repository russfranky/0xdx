import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Download } from 'lucide-react';
import litepaperSource from '../../../0xdx_litepaper.md?raw';

interface LitepaperProps {
  onBack: () => void;
}

export function Litepaper({ onBack }: LitepaperProps) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black flex items-center justify-center">
              <span className="text-white font-bold text-xs">0x</span>
            </div>
            <span className="font-bold tracking-tight uppercase">Litepaper</span>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            <Download className="w-4 h-4" /> Print
          </button>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <article
          className="
            prose prose-neutral max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-black
            prose-h1:text-5xl prose-h1:md:text-6xl prose-h1:tracking-tighter prose-h1:leading-[1.05] prose-h1:mb-8
            prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-neutral-200 prose-h2:pb-3
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:text-lg prose-p:text-neutral-800 prose-p:leading-relaxed prose-p:font-light
            prose-li:text-lg prose-li:text-neutral-800 prose-li:font-light
            prose-strong:text-black prose-strong:font-bold
            prose-a:text-black prose-a:underline prose-a:underline-offset-4
            prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-700
            prose-code:text-black prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:hidden prose-code:after:hidden
            prose-hr:my-12 prose-hr:border-neutral-200
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
