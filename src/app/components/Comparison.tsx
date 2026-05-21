import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface FailureMode {
  model: string;
  failure: string;
  resolution: string;
  tradeoff?: string;
}

const FAILURE_MODES: FailureMode[] = [
  {
    model: "Token-Weighted",
    failure: "Democracy in disguise. Large holders dominate decisions — one dollar, one vote. Compound's 2022 governance attack ($24M extracted) is the canonical example.",
    resolution: "Token weight drives community signal only — non-binding. The binding vote is 1-person-1-vote among elected committee members, and the framework requires identity-verified, staggered, slow-cadence elections (not pure 1t1v) so capture costs more than just buying tokens.",
    tradeoff: "Only as strong as the election mechanism. A deployment that picks a weak election re-imports plutocracy one layer up.",
  },
  {
    model: "One-Person-One-Vote",
    failure: "Requires reliable identity verification across a pseudonymous community. Sybil resistance at scale is an unsolved problem on-chain.",
    resolution: "1p1v applies only to the elected committee — a bounded population, where identity verification is tractable (proof-of-personhood, KYC, attested reputation, or in-person attestation, declared in the genesis proposal). The broader community signals pseudonymously, without identity requirements.",
  },
  {
    model: "Quadratic Voting",
    failure: "Depends on Sybil-resistant identity to function. Without it, an attacker splits funds across N wallets and the quadratic cost curve collapses.",
    resolution: "Sidestepped, not adopted. Preference intensity is expressed through token-weighted signaling; binding decisions are 1p1v among the committee. The Sybil-resistance requirement is scoped to committee membership, not the whole voter base.",
  },
  {
    model: "Delegated Voting",
    failure: "Power consolidates in a handful of professional delegates between votes. Plutocracy re-enters through the back door.",
    resolution: "Committees are directly elected, term-limited, and staggered — they don't accumulate power passively the way delegates do. Authority lapses at the end of each term and must be re-won.",
    tradeoff: "Any representative system depends on voter attention to elections. When turnout collapses, the committee drifts toward oligarchy. The petition / referendum (10% threshold) and fork mechanisms exist for when that happens.",
  },
  {
    model: "Reputation Systems",
    failure: "Reputation scores are gameable. Measuring contribution fairly at scale, in a permissionless system, is an open problem.",
    resolution: "Community election replaces reputation scoring. Accountability is structural: committee members answer to staggered re-elections and a public on-chain voting record — not to a score that can be farmed.",
  },
  {
    model: "Time-Locked Voting",
    failure: "Long commitment windows improve security but don't address who holds power. A well-funded attacker simply waits out the timelock.",
    resolution: "The 48h timelock is a window, not a safeguard on its own. It's the time during which three specific mechanisms can fire: a community petition / referendum at 10% of supply (binding, can override the committee), a one-shot Guardian veto where enabled, or a fork-and-exit that lets dissenters leave with their treasury share.",
    tradeoff: "A timelock only protects if at least one of those mechanisms is monitored. Deployments that don't enable the petition path are getting a delay, not a defense.",
  },
  {
    model: "Randomized Voting",
    failure: "Random selection produces uninformed or arbitrary decisions, and Sybil flooding inflates an attacker's selection probability. Rarely used in production DAOs.",
    resolution: "Committees are elected for demonstrated alignment and expertise, not chosen by lottery. Selection is by the community; incumbents answer for results at the next election.",
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
          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4">02 / Versus Alternatives</div>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 uppercase tracking-tighter leading-[0.9]">
            Every model<br />has a known flaw.
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed border-l-2 border-black dark:border-neutral-400 pl-6">
            Seven governance models. Seven documented failure points. Here's how 0xdx addresses each — and where the honest tradeoffs remain.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 min-h-[380px] md:min-h-[320px] overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 flex-1"
              >
                {/* Failure */}
                <div className="p-6 md:p-8 flex flex-col gap-3 justify-center">
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
                <div className="p-6 md:p-8 flex flex-col gap-3 justify-center bg-neutral-50 dark:bg-neutral-900">
                  <div className="flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-black dark:text-white shrink-0" aria-hidden="true" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black dark:text-white">
                      0xdx
                    </span>
                  </div>
                  <p className="text-sm text-black dark:text-white font-medium leading-relaxed">
                    {current.resolution}
                  </p>
                  {current.tradeoff && (
                    <div className="mt-1 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                      <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1.5">
                        Known tradeoff
                      </span>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {current.tradeoff}
                      </p>
                    </div>
                  )}
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
