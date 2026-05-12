import React, { useEffect, useMemo, useState } from 'react';
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

interface Chapter {
  id: string;
  number: string;
  title: string;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractChapters(md: string): Chapter[] {
  const lines = md.split('\n');
  const chapters: Chapter[] = [];
  for (const line of lines) {
    const match = line.match(/^##\s+(\d+)\.\s+(.+)$/);
    if (match) {
      const number = match[1];
      const title = match[2].trim();
      chapters.push({
        id: slugify(`${number}-${title}`),
        number,
        title,
      });
    }
  }
  return chapters;
}

export function Litepaper({ onBack, theme, onThemeToggle }: LitepaperProps) {
  const chapters = useMemo(() => extractChapters(litepaperSource), []);
  const [activeId, setActiveId] = useState<string | null>(chapters[0]?.id ?? null);

  // Scroll-spy: highlight whichever chapter heading is closest to the top.
  useEffect(() => {
    if (chapters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    );

    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [chapters]);

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // Inject ids onto h2 elements so the ToC anchors line up.
  const components = useMemo(
    () => ({
      h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const text = String(children);
        const match = text.match(/^(\d+)\.\s+(.+)$/);
        const id = match ? slugify(`${match[1]}-${match[2]}`) : slugify(text);
        return (
          <h2 id={id} {...props}>
            {children}
          </h2>
        );
      },
    }),
    []
  );

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

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">

          {/* Chapter ToC — sticky sidebar on desktop, inline collapsible on mobile */}
          <aside className="lg:col-span-3 mb-10 lg:mb-0 print:hidden">
            <div className="lg:sticky lg:top-32">
              <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4">
                Contents
              </div>
              <nav>
                <ul className="space-y-1 border-l border-neutral-200 dark:border-neutral-800">
                  {chapters.map((c) => {
                    const isActive = c.id === activeId;
                    return (
                      <li key={c.id}>
                        <button
                          onClick={() => handleJump(c.id)}
                          className={`group w-full text-left pl-4 pr-2 py-1.5 -ml-px border-l-2 transition-colors ${
                            isActive
                              ? 'border-black dark:border-white text-black dark:text-white'
                              : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                          }`}
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="text-[10px] font-mono tabular-nums text-neutral-400 dark:text-neutral-600 shrink-0">
                              {c.number.padStart(2, '0')}
                            </span>
                            <span className="text-xs font-medium leading-snug">
                              {c.title}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <article
            className="
              lg:col-span-9
              prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-black dark:prose-headings:text-white prose-headings:scroll-mt-32
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
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {litepaperSource}
            </ReactMarkdown>
          </article>

        </div>
      </main>
    </div>
  );
}
