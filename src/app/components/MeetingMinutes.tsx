import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FileText } from 'lucide-react';

export function MeetingMinutes({ onBack }: { onBack: () => void }) {
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
            <span className="font-bold tracking-tight uppercase">Meeting Minutes</span>
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
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-black uppercase leading-[0.9]">
            Open <br /> by default
          </h1>
          <p className="text-xl text-neutral-600 font-light leading-relaxed border-l-2 border-black pl-6">
            Every committee meeting under the 0xdx framework is recorded, signed, and published. Once committees begin operating on testnet, their minutes will appear here.
          </p>
        </motion.div>

        <div className="border-2 border-black p-12 md:p-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 border-2 border-black flex items-center justify-center mb-8">
            <FileText className="w-7 h-7 text-black" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
            No meetings yet
          </h2>
          <p className="text-neutral-600 font-light leading-relaxed max-w-md mb-8">
            0xdx is pre-launch. The first committees, proposals, and on-chain executions will appear here after testnet goes live.
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Status: pre-launch
          </p>
        </div>
      </main>
    </div>
  );
}
