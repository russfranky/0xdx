import React from 'react';
import { Quote } from 'lucide-react';
import { Phase } from '../App';

export function Testimonials({ phase }: { phase: Phase }) {
  const isTestnet = phase === 'testnet';

  const testimonials = isTestnet ? [
    {
      quote: "The testnet performance is incredible. We've been simulating thousands of votes per hour and the finality is instant. Can't wait for mainnet.",
      author: "Sarah Jenkins",
      role: "Founder, EcoProtocol",
      initials: "SJ"
    },
    {
      quote: "Finally, a governance primitive that feels like modern software. The dev experience on the testnet has been seamless.",
      author: "David Chen",
      role: "Lead Dev, DeFi Alliance",
      initials: "DC"
    },
    {
      quote: "We're using the incentivized testnet to trial-run our DAO's constitution. The flexibility of the modular governance system is a game changer.",
      author: "Elena Rodriguez",
      role: "Community Lead, ArtBlock",
      initials: "ER"
    }
  ] : [
    {
      quote: "We migrated our entire governance infrastructure to 0xDx. The instant finality changed how our community engages—voting feels like a chat app, not a bureaucracy.",
      author: "Sarah Jenkins",
      role: "Founder, EcoProtocol",
      initials: "SJ"
    },
    {
      quote: "The committee system allowed us to protect our treasury from front-running bots while maintaining full transparency. It's the security upgrade DAOs needed.",
      author: "David Chen",
      role: "Lead Dev, DeFi Alliance",
      initials: "DC"
    },
    {
      quote: "Finally, a platform that solves the apathy problem. Our participation rates tripled when we switched to 0xDx's signaled voting model.",
      author: "Elena Rodriguez",
      role: "Community Lead, ArtBlock",
      initials: "ER"
    }
  ];

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 uppercase tracking-tighter leading-[0.9]">
            {isTestnet ? 'What builders are saying' : 'Trusted by Builders'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-950 p-8 border-2 border-black dark:border-neutral-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] relative">
              <Quote className="w-12 h-12 text-neutral-100 dark:text-neutral-800 absolute top-6 right-6" />

              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 relative z-10 font-light text-lg">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-sm">
                  {item.initials}
                </div>
                <div>
                  <div className="font-bold text-black dark:text-white text-sm uppercase tracking-wide">{item.author}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
