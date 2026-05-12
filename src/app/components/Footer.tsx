import React from 'react';
import { Github } from 'lucide-react';
import { Phase } from '../App';

interface FooterProps {
  onLitepaperClick?: () => void;
  onRoadmapClick?: () => void;
  phase?: Phase;
}

const STATUS_BY_PHASE: Record<Phase, string> = {
  prelaunch: 'Pre-launch · Specification draft v1.0',
  testnet: 'Incentivized Testnet · v0.9',
  mainnet: 'Mainnet · v1.0',
};

export function Footer({ onLitepaperClick, onRoadmapClick, phase = 'testnet' }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-700 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="mb-6">
              <span className="text-xl font-bold text-black dark:text-white tracking-tighter">0xdx</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono uppercase tracking-wide leading-relaxed">
              A self-operating, committee-driven DAO governance framework.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-black dark:text-white mb-6 text-xs uppercase tracking-widest">Framework</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onLitepaperClick}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white text-sm uppercase tracking-wide font-medium"
                >
                  Litepaper
                </button>
              </li>
              <li>
                <button
                  onClick={onRoadmapClick}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white text-sm uppercase tracking-wide font-medium"
                >
                  Roadmap
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black dark:text-white mb-6 text-xs uppercase tracking-widest">Status</h4>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-mono uppercase tracking-wide">
              {STATUS_BY_PHASE[phase]}
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-neutral-600 dark:text-neutral-400 font-mono uppercase tracking-widest">
            © {year} <span className="normal-case">0xdx</span> · MIT License
          </p>
          <a
            href="https://github.com/russfranky/0xdx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="0xdx on GitHub"
            className="flex items-center gap-2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
