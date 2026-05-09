import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  onLitepaperClick?: () => void;
  onRoadmapClick?: () => void;
}

export function Footer({ onLitepaperClick, onRoadmapClick }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-neutral-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-black flex items-center justify-center">
                <span className="text-white font-bold text-xs">0x</span>
              </div>
              <span className="text-xl font-bold text-black tracking-tighter">0xdx</span>
            </div>
            <p className="text-xs text-neutral-600 font-mono uppercase tracking-wide leading-relaxed">
              A self-operating, committee-driven DAO governance framework.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6 text-xs uppercase tracking-widest">Framework</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onLitepaperClick}
                  className="text-neutral-600 hover:text-black text-sm uppercase tracking-wide font-medium"
                >
                  Litepaper
                </button>
              </li>
              <li>
                <button
                  onClick={onRoadmapClick}
                  className="text-neutral-600 hover:text-black text-sm uppercase tracking-wide font-medium"
                >
                  Roadmap
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6 text-xs uppercase tracking-widest">Status</h4>
            <p className="text-neutral-600 text-sm font-mono uppercase tracking-wide">
              Pre-launch · Specification draft v1.0
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
            © {year} <span className="normal-case">0xdx</span> · MIT License
          </p>
          <span className="flex items-center gap-2 text-neutral-400" aria-label="GitHub coming soon">
            <Github className="w-5 h-5" />
          </span>
        </div>
      </div>
    </footer>
  );
}
