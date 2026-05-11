import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';
import { Phase } from '../App';

interface CTAProps {
  phase: Phase;
  onLitepaperClick?: () => void;
}

export function CTA({ phase, onLitepaperClick }: CTAProps) {
  const isTestnet = phase === 'testnet';
  const isPrelaunch = phase === 'prelaunch';

  return (
    <section className="py-28 bg-black text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 uppercase leading-[0.9]">
          Build the future <br />
          of coordination
        </h2>
        <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          {isPrelaunch
            ? "0xdx is a governance framework spec, not yet deployed. Read the litepaper, follow along on GitHub, and help shape it before launch."
            : isTestnet
            ? "The 0xdx testnet is open for developers, DAOs, and curious minds. Start experimenting with next-gen governance primitives today."
            : "The 0xdx protocol is live. Start your organization in minutes or read our documentation to integrate with your existing stack."
          }
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button size="lg" onClick={onLitepaperClick} className="bg-white text-black hover:bg-neutral-200 text-sm font-bold uppercase tracking-widest px-10 h-14 rounded-full border-2 border-transparent">
            {isPrelaunch ? 'Read the Litepaper' : isTestnet ? 'Join Incentivized Testnet' : 'Launch Organization'}
          </Button>
          {isPrelaunch ? (
            <a
              href="https://github.com/russfranky/0xdx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-300 text-sm font-bold uppercase tracking-widest flex items-center gap-2 group"
            >
              View on GitHub <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <button type="button" className="text-white hover:text-neutral-300 text-sm font-bold uppercase tracking-widest flex items-center gap-2 group">
              {isTestnet ? 'Read the Documentation' : 'View Developer Docs'} <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
