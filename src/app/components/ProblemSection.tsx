import React from 'react';
import { motion } from 'motion/react';
import { Triangle, UserX, HandHelping } from 'lucide-react';

export function ProblemSection() {
  const cards = [
    {
      icon: Triangle,
      stat: "Plutocracy",
      statDesc: "Token-weighted voting",
      title: "Whales decide",
      problem: "Token-weighted DAOs concentrate decision-making in whoever bought the most. The median holder's vote rounds to noise.",
    },
    {
      icon: UserX,
      stat: "Privacy",
      statDesc: "vs. one-person-one-vote",
      title: "The identity paradox",
      problem: "One-person-one-vote usually requires centralized KYC, so most DAOs default to token weight and re-import plutocracy. Proof of personhood (encrypted biometrics, attested uniqueness) escapes the binary — but few have adopted it.",
    },
    {
      icon: HandHelping,
      stat: "Apathy",
      statDesc: "Low turnout, captured outcomes",
      title: "Nobody shows up",
      problem: "Governance forums turn into theatre while a small set of delegates and whales actually decides. See: Maker Endgame, Aragon dissolution.",
    }
  ];

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
          <div>
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4">01 / The Problem</div>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tighter uppercase leading-[0.9]">Why DAOs <br/> Are Broken</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
              Every governance model forces you to choose: plutocracy OR privacy, efficiency OR fairness, automation OR community.
            </p>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold text-black dark:text-white border-l-4 border-black dark:border-neutral-400 pl-6 uppercase tracking-tight leading-tight">
              <span className="normal-case">0xdx</span> eliminates <br/> those choices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-700 border-t-2 border-b-2 border-black dark:border-neutral-600">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="py-10 md:px-10 first:pl-0 last:pr-0"
            >
              <div className="mb-6">
                <div className="text-6xl font-bold text-black dark:text-white mb-2 tracking-tighter">{card.stat}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{card.statDesc}</div>
              </div>

              <h3 className="text-xl font-bold text-black dark:text-white mb-3 uppercase tracking-tight">{card.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm font-light">{card.problem}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
