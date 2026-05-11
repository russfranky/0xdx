import React from 'react';
import { motion } from 'motion/react';
import { Users, FileText, Activity, Vote, Zap } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Idea & Deposit",
      desc: "Anyone can submit a proposal. A small deposit prevents spam.",
    },
    {
      icon: Activity,
      title: "Community Signal",
      desc: "Token holders stake to signal sentiment. This guides the committee.",
    },
    {
      icon: Users,
      title: "Committee Vote",
      desc: "Elected stewards review and vote (1-person-1-vote). No whales.",
    },
    {
      icon: Zap,
      title: "Auto-Execution",
      desc: "Passed proposals execute automatically on-chain after a safety timelock.",
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black dark:text-white mb-6 uppercase leading-[0.9]">
              From signal <br /> to execution.
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed border-l-2 border-black dark:border-neutral-400 pl-6">
              We replaced the chaos of token voting with a structured, automated pipeline.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="relative pl-20 md:pl-24 group">
                  {/* Step Number/Icon */}
                  <div className="absolute left-0 top-0 w-16 h-16 border-2 border-black dark:border-neutral-500 bg-white dark:bg-neutral-900 flex items-center justify-center rounded-none z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                     <step.icon className="w-7 h-7 text-black dark:text-white" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div className="pt-4">
                    <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-2">{`0${idx + 1}`}</div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-3 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm max-w-xs font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
