import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { ArrowRight, Beaker, Globe, Zap, ShieldCheck, Activity, Users } from 'lucide-react';
import { Phase } from '../App';

interface HeroProps {
  phase: Phase;
  onLitepaperClick?: () => void;
}

const STAGE_LABELS = ['01 Signal', '02 Vote', '03 Timelock', '04 Execute'];
const STAGE_KEYS = ['SIGNAL', 'COMMITTEE_VOTE', 'TIMELOCK', 'EXECUTING'];

export function Hero({ phase, onLitepaperClick }: HeroProps) {
  const isTestnet = phase === 'testnet';
  const isPrelaunch = phase === 'prelaunch';
  const [stage, setStage] = useState(0);

  const accentBg = isTestnet ? 'bg-orange-500' : 'bg-emerald-500';

  return (
    <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 bg-white dark:bg-neutral-950 overflow-hidden">
      {/* Abstract Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Large decorative circles */}
      <div className="absolute -right-[10%] top-[10%] w-[800px] h-[800px] rounded-full border border-neutral-100 dark:border-neutral-800 opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute -right-[5%] top-[20%] w-[600px] h-[600px] rounded-full border border-neutral-100 dark:border-neutral-800 opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7 min-w-0 flex flex-col items-start text-left">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="flex h-2 w-2 relative">
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPrelaunch ? 'bg-neutral-400' : isTestnet ? 'bg-orange-500' : 'bg-emerald-500'}`}></span>
              </span>
              <span className="text-sm font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                {isPrelaunch ? 'Specification Draft · v1.0' : isTestnet ? 'Incentivized Testnet Live' : 'Protocol V2 is Live'}
              </span>
            </motion.div>

            <motion.h1
              key={`h1-${phase}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-black dark:text-white tracking-tighter mb-6 leading-[0.95] uppercase"
            >
              Decentralized <br />
              Governance <br />
              <span className="text-neutral-400">Ecosystem.</span>
            </motion.h1>

            <motion.p
              key={`p-${phase}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-xl mb-8 leading-normal font-light"
            >
              {isPrelaunch
                ? "0xdx is a governance framework specification: elected committees decide one-person-one-vote, smart contracts auto-execute, and a built-in DEX funds the treasury. Read the litepaper."
                : isTestnet
                ? "Test the hybrid model: Committee-driven decisions with automated execution. Help us validate the economic engine before mainnet."
                : "0xdx is the operating system for decentralized entities. Elected committees make decisions, code executes them, and built-in DEX fees fund the treasury."
              }
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {isPrelaunch ? (
                <Button
                  size="lg"
                  onClick={onLitepaperClick}
                  className="rounded-full px-10 h-14 text-lg flex items-center gap-2"
                >
                  Read Litepaper
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Button>
              ) : (
                <>
                  <Button size="lg" className="rounded-full px-10 h-14 text-lg flex items-center gap-2">
                    {isTestnet ? <Beaker className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                    {isTestnet ? 'Join Testnet' : 'Deploy Organization'}
                  </Button>
                  <button
                    onClick={onLitepaperClick}
                    className="group flex items-center gap-2 text-black dark:text-white font-medium hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
                  >
                    Read Litepaper
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Content - Proposal Stage Walkthrough */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-5 min-w-0 relative"
          >
            <div className="relative z-10 bg-white dark:bg-neutral-900 rounded-lg border-2 border-black dark:border-neutral-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] overflow-hidden">
              {/* Header */}
              <div className={`${isTestnet ? 'bg-orange-50 border-orange-100 dark:bg-orange-950/30' : 'bg-neutral-50 border-neutral-200 dark:bg-neutral-800'} border-b-2 border-black dark:border-neutral-700 p-4 flex items-center justify-between`}>
                <div className="flex gap-2">
                  <div className={`w-3 h-3 rounded-full border border-black ${isTestnet ? 'bg-orange-400' : 'bg-neutral-200'}`} />
                  <div className={`w-3 h-3 rounded-full border border-black ${isTestnet ? 'bg-orange-400' : 'bg-neutral-200'}`} />
                </div>
                <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isTestnet ? 'text-orange-600' : 'text-neutral-500 dark:text-neutral-400'}`}>
                  {isPrelaunch ? 'Illustrative · Sample Flow' : isTestnet ? 'Testnet Consensus' : 'Live Consensus'}
                </div>
              </div>

              {/* Stage Tabs */}
              <div className="border-b border-neutral-100 dark:border-neutral-800 flex">
                {STAGE_LABELS.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setStage(i)}
                    className={`flex-1 px-2 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors border-r last:border-r-0 border-neutral-100 dark:border-neutral-800 ${
                      stage === i
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Proposal Header (always visible) */}
              <div className="px-6 pt-5 pb-3">
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">Proposal #124</div>
                <div className="text-lg font-bold text-black dark:text-white mb-1">Fund DEX Liquidity Pair</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">Releasing 50,000 USDC from Treasury to Uniswap V3 Pool.</div>
              </div>

              {/* Stage Content */}
              <div className="px-6 pb-6 min-h-[180px]">
                <AnimatePresence mode="wait">
                  {stage === 0 && (
                    <motion.div
                      key="stage0"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                          <span className="text-black dark:text-white flex items-center gap-1.5"><Activity className="w-3 h-3" /> Community Signal</span>
                          <span className="text-neutral-500 dark:text-neutral-400">78% Support</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-700">
                          <div className={`${accentBg} h-full w-[78%]`} />
                        </div>
                        <div className="mt-1.5 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">$182k in tokens signaling YES · Non-binding</div>
                      </div>
                      <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-3 rounded text-xs text-neutral-600 dark:text-neutral-300">
                        Signal period open · <span className="font-bold">3 days remaining</span> before committee review
                      </div>
                    </motion.div>
                  )}

                  {stage === 1 && (
                    <motion.div
                      key="stage1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                          <span className="text-black dark:text-white flex items-center gap-1.5"><Users className="w-3 h-3" /> Committee Votes</span>
                          <span className="text-neutral-500 dark:text-neutral-400">5/7 YES · Passed</span>
                        </div>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={`h-3 flex-1 ${accentBg}`} />
                          ))}
                          {[6,7].map(i => (
                            <div key={i} className="h-3 flex-1 bg-neutral-100 dark:bg-neutral-700" />
                          ))}
                        </div>
                        <div className="mt-1.5 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">1-person-1-vote · No token weighting</div>
                      </div>
                      <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-3 rounded text-xs text-neutral-600 dark:text-neutral-300">
                        Supermajority reached · <span className="font-bold">Entering timelock</span>
                      </div>
                    </motion.div>
                  )}

                  {stage === 2 && (
                    <motion.div
                      key="stage2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-black dark:border-neutral-600 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-6 h-6 text-black dark:text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-0.5">Safety Timelock</div>
                          <div className="font-mono text-2xl font-bold text-black dark:text-white">23:14:05</div>
                          <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">48h window remaining</div>
                        </div>
                      </div>
                      <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-3 rounded text-xs text-neutral-600 dark:text-neutral-300">
                        Community veto window open · <span className="font-bold">No objections raised</span>
                      </div>
                    </motion.div>
                  )}

                  {stage === 3 && (
                    <motion.div
                      key="stage3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-4 text-sm">
                        <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-black dark:text-white text-xs uppercase tracking-wide">Timelock Ended</div>
                          <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400">48h Safety Period Complete</div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${accentBg}`} />
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-600 shrink-0">
                          <Zap className="w-4 h-4 text-black dark:text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-black dark:text-white text-xs uppercase tracking-wide">Tx Broadcast</div>
                          <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400">0x8a3f...92b1</div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${accentBg}`} />
                      </div>
                      <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-3 rounded text-xs text-neutral-600 dark:text-neutral-300">
                        <span className="font-bold">50,000 USDC</span> deployed to Uniswap V3 Pool · Fees now accruing to treasury
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom status bar */}
              <div className="bg-neutral-900 text-neutral-500 p-3 flex justify-between text-xs font-mono">
                <span>STAGE: {STAGE_KEYS[stage]}</span>
                <span>FEES: REINVESTED</span>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-neutral-200 dark:border-neutral-700 rounded-xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-full h-full bg-neutral-50 dark:bg-neutral-800 rounded-xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
