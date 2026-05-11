import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { ArrowRight, Beaker, Globe, Zap, ShieldCheck } from 'lucide-react';
import { Phase } from '../App';

interface HeroProps {
  phase: Phase;
  onLitepaperClick?: () => void;
}

export function Hero({ phase, onLitepaperClick }: HeroProps) {
  const isTestnet = phase === 'testnet';
  const isPrelaunch = phase === 'prelaunch';

  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 bg-white overflow-hidden">
      {/* Abstract Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Large decorative circles */}
      <div className="absolute -right-[10%] top-[10%] w-[800px] h-[800px] rounded-full border border-neutral-100 opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute -right-[5%] top-[20%] w-[600px] h-[600px] rounded-full border border-neutral-100 opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div 
              key={phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="flex h-2 w-2 relative">
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPrelaunch ? 'bg-neutral-400' : isTestnet ? 'bg-orange-500' : 'bg-emerald-500'}`}></span>
              </span>
              <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                {isPrelaunch ? 'Specification Draft · v1.0' : isTestnet ? 'Incentivized Testnet Live' : 'Protocol V2 is Live'}
              </span>
            </motion.div>

            <motion.h1 
              key={`h1-${phase}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black tracking-tighter mb-8 leading-[0.95] uppercase"
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
              className="text-xl md:text-2xl text-neutral-600 max-w-xl mb-12 leading-normal font-light"
            >
              {isPrelaunch
                ? "0xdx is a governance framework specification: elected committees decide one-person-one-vote, smart contracts auto-execute, and a built-in DEX funds the treasury. Read the litepaper."
                : isTestnet
                ? "Test the hybrid model: Committee-driven decisions with automated execution. Help us validate the economic engine before mainnet."
                : "0xdx is the operating system for productive DAOs. Elected committees make decisions, code executes them, and built-in DEX fees fund the treasury."
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
                    {isTestnet ? 'Join Testnet' : 'Deploy DAO'}
                  </Button>
                  <button
                    onClick={onLitepaperClick}
                    className="group flex items-center gap-2 text-black font-medium hover:text-neutral-600 transition-colors"
                  >
                    Read Litepaper
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Content - Visualizing the Consensus Loop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Main "Device" */}
            <div className="relative z-10 bg-white rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className={`${isTestnet ? 'bg-orange-50 border-orange-100' : 'bg-neutral-50 border-neutral-200'} border-b-2 border-black p-4 flex items-center justify-between`}>
                <div className="flex gap-2">
                  <div className={`w-3 h-3 rounded-full border border-black ${isTestnet ? 'bg-orange-400' : 'bg-neutral-200'}`} />
                  <div className={`w-3 h-3 rounded-full border border-black ${isTestnet ? 'bg-orange-400' : 'bg-neutral-200'}`} />
                </div>
                <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isTestnet ? 'text-orange-600' : 'text-neutral-500'}`}>
                  {isPrelaunch ? 'Illustrative · Sample Flow' : isTestnet ? 'Testnet Consensus' : 'Live Consensus'}
                </div>
              </div>
              
              <div className="p-8">
                {/* Visualizing a proposal execution */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-wide">
                      Proposal #124
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">
                      <Zap className="w-3 h-3" /> Auto-Executing
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-black mb-1">
                    Fund DEX Liquidity Pair
                  </div>
                  <div className="text-sm text-neutral-500 mb-6">
                    Releasing 50,000 USDC from Treasury to Uniswap V3 Pool.
                  </div>
                  
                  {/* Committee Votes Visual */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-xs font-bold text-neutral-900 mb-1">
                      <span>Committee Votes (5/7)</span>
                      <span>Passed</span>
                    </div>
                    <div className="flex gap-1">
                       {[1,2,3,4,5].map(i => (
                         <div key={i} className={`h-2 flex-1 rounded-sm ${isTestnet ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                       ))}
                       {[6,7].map(i => (
                         <div key={i} className="h-2 flex-1 rounded-sm bg-neutral-100" />
                       ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-t border-neutral-100 pt-6">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center border border-neutral-200 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-black text-xs uppercase tracking-wide">Timelock Ended</div>
                      <div className="font-mono text-xs text-neutral-500">48h Safety Period Complete</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm opacity-50">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-neutral-200 shrink-0">
                      <div className={`w-2 h-2 rounded-full ${isTestnet ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-black text-xs uppercase tracking-wide">Tx Broadcast</div>
                      <div className="font-mono text-xs text-neutral-500">0x8a...92b1</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom status bar */}
              <div className="bg-neutral-900 text-neutral-500 p-4 flex justify-between text-xs font-mono">
                <span>MODE: COMMITTEE_SIG</span>
                <span>FEES: REINVESTED</span>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-neutral-200 rounded-xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-full h-full bg-neutral-50 rounded-xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
