import React from 'react';
import { motion } from 'motion/react';
import { Users, Filter, VenetianMask, Heart, Coins, Lock } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Users,
      title: "One Member, One Vote",
      desc: "Equal voting power regardless of contribution size. No plutocracy.",
    },
    {
      icon: Filter,
      title: "Community-Driven",
      desc: "Anyone can propose. Treasury funds approved proposals automatically.",
    },
    {
      icon: VenetianMask,
      title: "Pseudonymous",
      desc: "No KYC or centralized identity verification required.",
    },
    {
      icon: Heart,
      title: "Sentiment Signaling",
      desc: "Token-weighted signaling provides transparent community feedback.",
    },
    {
      icon: Coins,
      title: "Self-Sustaining",
      desc: "Integrated DEX fees flow to treasury for continuous funding.",
    },
    {
      icon: Lock,
      title: "Liquidity Locked",
      desc: "Initial liquidity is permanently locked for stability.",
    }
  ];

  return (
    <section className="py-28 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black dark:bg-neutral-600 border-2 border-black dark:border-neutral-600">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-950 p-12 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
              <feature.icon className="w-8 h-8 text-black dark:text-white mb-6" />
              <h3 className="text-xl font-bold text-black dark:text-white mb-3 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed font-light">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
