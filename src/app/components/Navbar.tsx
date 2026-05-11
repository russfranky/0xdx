import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onLitepaperClick?: () => void;
  onDiscoverClick?: () => void;
  onRoadmapClick?: () => void;
  onGovernanceClick?: () => void;
  onHomeClick?: () => void;
}

export function Navbar({ onLitepaperClick, onDiscoverClick, onRoadmapClick, onGovernanceClick, onHomeClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Litepaper', onClick: onLitepaperClick },
    { name: 'Roadmap', onClick: onRoadmapClick },
    { name: 'Ecosystem', onClick: onDiscoverClick },
    { name: 'Dashboard', onClick: onGovernanceClick },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={onHomeClick} className="flex items-center gap-2" aria-label="0xdx home">
          <div className="w-8 h-8 bg-black flex items-center justify-center">
            <span className="text-white font-bold text-sm">0x</span>
          </div>
          <span className="text-xl font-bold text-black tracking-tighter">0xdx</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={link.onClick}
              className="text-xs font-bold text-neutral-600 hover:text-black transition-colors uppercase tracking-widest"
            >
              {link.name}
            </button>
          ))}
        </div>

        <button
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-neutral-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.onClick) link.onClick();
                    setIsOpen(false);
                  }}
                  className="text-lg font-medium text-neutral-900 text-left"
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
