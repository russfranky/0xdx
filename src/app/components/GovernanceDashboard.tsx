import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';

interface GovernanceDashboardProps {
  onBack: () => void;
}

export function GovernanceDashboard({ onBack }: GovernanceDashboardProps) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black flex items-center justify-center">
              <span className="text-white font-bold text-xs">0x</span>
            </div>
            <h1 className="font-bold tracking-tight uppercase">Governance Dashboard</h1>
          </div>

          <div className="w-20" />
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-black uppercase leading-[0.9]">
            Real-time, <br /> on-chain.
          </h2>
          <p className="text-xl text-neutral-600 font-light leading-relaxed border-l-2 border-black pl-6">
            Live proposals, committee votes, treasury flows, and sentiment signal will appear here once the framework is deployed. Until then, the dashboard is intentionally empty — there is no production data to show.
          </p>
        </motion.div>

        <div className="border-2 border-black p-12 md:p-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 border-2 border-black flex items-center justify-center mb-8">
            <LayoutDashboard className="w-7 h-7 text-black" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
            Dashboard activates with testnet
          </h3>
          <p className="text-neutral-600 font-light leading-relaxed max-w-md mb-8">
            Stewards, treasury, proposals, and sentiment will all be visible here in real time once 0xdx goes live. No mock data is rendered in pre-launch.
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Status: pre-launch
          </p>
        </div>
      </main>
    </div>
  );
}
