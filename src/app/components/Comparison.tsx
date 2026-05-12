import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const FAILURE_MODES = [
  {
    model: "Token-Weighted",
    failure: "Democracy in disguise. Large holders dominate decisions — one dollar, one vote.",
    resolution: "Token weight drives community signal only — non-binding. The elected committee votes 1-person-1-vote. No token holder can execute a decision unilaterally.",
  },
  {
    model: "One-Person-One-Vote",
    failure: "Requires stringent identity verification across a pseudonymous community. Sybil resistance at scale is unsolved.",
    resolution: "1p1v applies only to the elected committee — a small, accountable group chosen by the community. The broader community signals pseudonymously, without identity requirements.",
  },
  {
    model: "Quadratic Voting",
    failure: "Adds complexity without fully solving power concentration. More attack surface, harder to audit.",
    resolution: "Signal + elected committee is simpler, transparent, and harder to game. Complexity is a vulnerability; the model avoids it by design.",
  },
  {
    model: "Delegated Voting",
    failure: "Power consolidates in delegates between votes. Plutocracy re-enters through the back door.",
    resolution: "Committees are elected and term-limited. Execution is automated — no delegate holds ongoing power between votes. The contract is the intermediary.",
  },
  {
    model: "Reputation Systems",
    failure: "Centralized reputation scores are gameable. Measuring contribution fairly at scale is an unsolved problem.",
    resolution: "Community election replaces reputation scoring. Accountability is structural: committee members answer to re-election, not to a score.",
  },
  {
    model: "Randomized Voting",
    failure: "Uninformed or arbitrary decisions. A randomly selected voter has no accountability for outcomes.",
    resolution: "Committee members are elected for demonstrated alignment and expertise. Selection is by the community, not by chance — and incumbents answer for results.",
  },
  {
    model: "Time-Locked Voting",
    failure: "Long commitment windows improve security but don't address who holds power or how decisions are made.",
    resolution: "The timelock is a post-approval safety buffer — a community veto window, not a voting mechanism. Voting happens before it. The lock protects; it doesn't govern.",
  },
];

export function Comparison() {
  const [active, setActive] = useState(0);
  const total = FAILURE_MODES.length;

  const go = (next: number) => setActive(((next % total) + total) % total);
  const current = FAILURE_MODES[active];

  return (
    <section className="py-16 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-10 max-w-2xl">
          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4">05 / Versus Alternatives</div>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 uppercase tracking-tighter leading-[0.9]">
            Every model<br />has a known flaw.
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed border-l-2 border-black dark:border-neutral-400 pl-6">
            Seven governance models. Seven documented failure points. 0xdx was designed around all of them.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 min-h-[280px] md:min-h-[240px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800"
              >
                {/* Failure */}
                <div className="p-6 md:p-8 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 tabular-nums">
                      {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      {current.model}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {current.failure}
                  </p>
                </div>

                {/* Resolution */}
                <div className="p-6 md:p-8 flex flex-col gap-3 bg-neutral-50 dark:bg-neutral-900">
                  <div className="flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-black dark:text-white shrink-0" aria-hidden="true" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black dark:text-white">
                      0xdx
                    </span>
                  </div>
                  <p className="text-sm text-black dark:text-white font-medium leading-relaxed">
                    {current.resolution}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {FAILURE_MODES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={`Show model ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === active
                      ? 'w-6 bg-black dark:bg-white'
                      : 'w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => go(active - 1)}
                aria-label="Previous model"
                className="w-9 h-9 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => go(active + 1)}
                aria-label="Next model"
                className="w-9 h-9 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
