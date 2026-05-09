import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Check, Clock, TrendingUp, PieChart } from 'lucide-react';
import { Phase } from '../App';

export function DashboardPreview({ phase }: { phase: Phase }) {
  if (phase === 'prelaunch') return null;
  return (
    <section className="py-28 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 uppercase tracking-tighter">Transparency First</h2>
          <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">Real-time governance dashboard</p>
        </div>

        <div className="bg-white border-2 border-black overflow-hidden max-w-5xl mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
          {/* Header */}
          <div className="border-b-2 border-black px-8 py-4 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <div className="font-bold text-black uppercase tracking-wider">Ocean Cleanup DAO</div>
              <span className="px-2 py-0.5 border border-black text-black text-[10px] font-bold uppercase tracking-widest">Active</span>
            </div>
            <div className="flex gap-4 text-xs font-mono uppercase tracking-wider text-neutral-500">
              <span>Treasury: <span className="text-black font-bold">$2,400,000</span></span>
              <span>Members: <span className="text-black font-bold">7</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x-2 divide-black">
            {/* Main Content */}
            <div className="lg:col-span-2 p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Active Proposal</div>
                  <h3 className="text-2xl font-bold text-black mb-2 uppercase leading-tight">Fund Protocol Incubator Phase 2</h3>
                  <p className="text-neutral-600 text-sm">Requesting $450k allocation for Q3 development grants.</p>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Time Remaining</div>
                   <div className="font-mono text-lg font-bold text-black">22:14:05</div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Voting Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-black">Committee Votes</span>
                    <span className="text-neutral-500">5/7 YES</span>
                  </div>
                  <div className="flex h-8 w-full border border-black overflow-hidden bg-white">
                    <div className="bg-black w-[71%] flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest">YES (71%)</div>
                    <div className="bg-neutral-100 w-[29%]"></div>
                  </div>
                </div>

                {/* Sentiment Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-black">Community Sentiment</span>
                    <span className="text-neutral-500">93% Support</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 overflow-hidden">
                    <div className="bg-black h-full w-[93%]"></div>
                  </div>
                  <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    $450k in tokens signaling YES
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="p-8 bg-neutral-50">
              <h4 className="font-bold text-black mb-6 flex items-center gap-2 uppercase tracking-wide text-xs">
                <PieChart className="w-4 h-4" /> Allocation
              </h4>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                   <span className="text-neutral-600">Dev Grants</span>
                   <span className="text-black">40%</span>
                </div>
                <div className="w-full h-1 bg-neutral-200">
                  <div className="bg-black h-full w-[40%]"></div>
                </div>

                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                   <span className="text-neutral-600">Operations</span>
                   <span className="text-black">35%</span>
                </div>
                <div className="w-full h-1 bg-neutral-200">
                  <div className="bg-neutral-600 h-full w-[35%]"></div>
                </div>

                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                   <span className="text-neutral-600">Marketing</span>
                   <span className="text-black">25%</span>
                </div>
                <div className="w-full h-1 bg-neutral-200">
                  <div className="bg-neutral-400 h-full w-[25%]"></div>
                </div>
              </div>

              <Button className="w-full text-xs font-bold uppercase tracking-widest" variant="outline">View Full Report</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
