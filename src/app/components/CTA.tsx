import React from 'react';
import { Button } from './ui/Button';
import { EmailCapture } from './EmailCapture';
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
    <section className="py-16 bg-black dark:bg-neutral-900 text-white text-center border-y border-transparent dark:border-neutral-800">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 uppercase leading-[0.9]">
          Governance that <br />
          doesn't bend.
        </h2>
        <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          {isPrelaunch
            ? "You've seen the failure modes. You've seen the model. Get on the list — we'll write when testnet ships, and not before."
            : isTestnet
            ? "You've seen the failure modes. You've seen the model. Now stress-test it on testnet — deploy a sandbox org, run real proposals, break things before mainnet."
            : "You've seen the failure modes. You've seen the model. Now deploy an organization that can't be bought, can't stall, and funds itself."
          }
        </p>
        {isPrelaunch ? (
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-md">
              <EmailCapture tone="light" submitLabel="Notify me" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" onClick={onLitepaperClick} className="bg-white text-black hover:bg-neutral-200 text-sm font-bold uppercase tracking-widest px-10 h-14 rounded-full border-2 border-transparent">
              {isTestnet ? 'Join Incentivized Testnet' : 'Launch Organization'}
            </Button>
            <button type="button" className="text-white hover:text-neutral-300 text-sm font-bold uppercase tracking-widest flex items-center gap-2 group">
              {isTestnet ? 'Read the Documentation' : 'View Developer Docs'} <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
