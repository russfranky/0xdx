import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Phase } from '../App';
import { EASE_OUT } from '../motion';

interface NavbarProps {
  phase: Phase;
  onLitepaperClick?: () => void;
  onDiscoverClick?: () => void;
  onRoadmapClick?: () => void;
  onGovernanceClick?: () => void;
  onHomeClick?: () => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

const PHASE_LABEL: Record<Phase, { label: string; dotClass: string }> = {
  prelaunch: { label: 'Prelaunch · Testnet coming soon', dotClass: 'bg-neutral-400' },
  testnet: { label: 'Incentivized Testnet · Live', dotClass: 'bg-orange-500' },
  mainnet: { label: 'Mainnet · Live', dotClass: 'bg-emerald-500' },
};

export function Navbar({ phase, onLitepaperClick, onDiscoverClick, onRoadmapClick, onGovernanceClick, onHomeClick, theme, onThemeToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const phaseMeta = PHASE_LABEL[phase];

  const links = [
    { name: 'Litepaper', onClick: onLitepaperClick },
    { name: 'Roadmap', onClick: onRoadmapClick },
    { name: 'Ecosystem', onClick: onDiscoverClick },
    { name: 'Dashboard', onClick: onGovernanceClick },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onHomeClick} className="flex items-center gap-2 shrink-0" aria-label="0xdx home">
            <span className="text-xl font-bold text-black dark:text-white tracking-tighter">0xdx</span>
          </button>
          <span
            className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 border border-neutral-200 dark:border-neutral-700 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
            title={phaseMeta.label}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${phaseMeta.dotClass}`} />
            <span className="truncate max-w-[200px]">{phaseMeta.label}</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={link.onClick}
              className="py-2 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.name}
            </button>
          ))}
          {onThemeToggle && (
            <button
              onClick={onThemeToggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-11 h-11 flex items-center justify-center rounded-full text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          {onThemeToggle && (
            <button
              onClick={onThemeToggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-11 h-11 flex items-center justify-center rounded-full text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <button
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="w-11 h-11 flex items-center justify-center text-black dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: EASE_OUT } }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="md:hidden bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.onClick) link.onClick();
                    setIsOpen(false);
                  }}
                  className="text-lg font-medium text-neutral-900 dark:text-neutral-100 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
