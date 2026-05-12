import React from 'react';
import { motion } from 'motion/react';
import { Globe, Server, Zap, Lock, Activity, Coins, BarChart3, Repeat } from 'lucide-react';
import { Phase } from '../App';

export function GovernanceScale({ phase }: { phase: Phase }) {
  const isTestnet = phase === 'testnet';
  const isPrelaunch = phase === 'prelaunch';

  return (
    <section id="governance" className="py-16 bg-black dark:bg-neutral-900 text-white overflow-hidden relative border-y border-transparent dark:border-neutral-800">
      {/* Background World Map / Network Hint */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
         <svg width="100%" height="100%" className="absolute inset-0">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
         {/* Decorative Arcs */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-neutral-800 rounded-full" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-neutral-800 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          
          <div>
            {isTestnet && (
              <div className="flex items-center gap-2 mb-6 text-orange-400 font-mono text-xs uppercase tracking-widest">
                <Activity className="w-4 h-4" />
                Incentivized Testnet
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9] mb-8">
              A self-funding <br /> economic engine.
            </h2>
            <p className="text-xl text-neutral-500 font-light leading-relaxed max-w-md">
              {isPrelaunch
                ? "Projects die when grants run out. 0xdx is built for permanence: an integrated DEX captures trading fees and routes them directly to the treasury. Every transaction in the ecosystem funds the next round of development."
                : isTestnet
                ? "Most projects die when the grants run out. 0xdx is different. Test the automated fee-sharing modules that keep the treasury perpetual."
                : "The 0xdx protocol includes an integrated DEX where trading fees automatically route to the treasury. The more the ecosystem is used, the more projects it can fund — a self-sustaining loop."
              }
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
              <div className="bg-black p-6">
                <div className="text-5xl font-mono font-bold mb-2 tracking-tighter">100%</div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  Initial Liquidity Locked
                </div>
              </div>
              <div className="bg-black p-6">
                <div className="text-5xl font-mono font-bold mb-2 tracking-tighter">0.3%</div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Protocol Fee to Treasury</div>
              </div>
              <div className="bg-black p-6">
                <div className="text-5xl font-mono font-bold mb-2 tracking-tighter">{isPrelaunch ? '1p1v' : isTestnet ? '5k+' : '∞'}</div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  {isPrelaunch ? 'Committee Voting' : isTestnet ? 'Testnet Trades' : 'Sustainable Runrate'}
                </div>
              </div>
              <div className="bg-black p-6">
                <div className="text-5xl font-mono font-bold mb-2 tracking-tighter">{isTestnet ? '24h' : '48h'}</div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  Security Timelock
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
             <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-lg flex gap-4 items-start">
               <Repeat className="w-8 h-8 text-neutral-500 shrink-0" />
               <div>
                 <h3 className="text-lg font-bold text-white mb-2">
                   {isTestnet ? 'Test Revenue Loop' : 'The Revenue Loop'}
                 </h3>
                 <p className="text-neutral-500 text-sm leading-relaxed">
                   Users trade on the integrated DEX. Fees are captured. The Treasury grows. Governance funds new growth. A closed loop of value.
                 </p>
               </div>
             </div>

             <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-lg flex gap-4 items-start">
               <Lock className="w-8 h-8 text-neutral-500 shrink-0" />
               <div>
                 <h3 className="text-lg font-bold text-white mb-2">
                   Immovable Liquidity
                 </h3>
                 <p className="text-neutral-500 text-sm leading-relaxed">
                   Committee members must lock initial liquidity permanently. No rug pulls. No sudden withdrawals. Just deep, reliable markets.
                 </p>
               </div>
             </div>

             <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-lg flex gap-4 items-start">
               <BarChart3 className="w-8 h-8 text-neutral-500 shrink-0" />
               <div>
                 <h3 className="text-lg font-bold text-white mb-2">
                   Productive Assets
                 </h3>
                 <p className="text-neutral-500 text-sm leading-relaxed">
                   The treasury doesn't just sit there. It earns yield and fees, ensuring the organization has the firepower to build for decades, not months.
                 </p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
