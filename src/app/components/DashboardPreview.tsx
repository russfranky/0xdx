import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Check, Clock, TrendingUp, PieChart } from 'lucide-react';
import { Phase } from '../App';

export function DashboardPreview({ phase }: { phase: Phase }) {
  if (phase === 'prelaunch') return null;
  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 uppercase tracking-tighter">Transparency First</h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm uppercase tracking-widest">Real-time governance dashboard</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border-2 border-black dark:border-neutral-700 overflow-hidden max-w-5xl mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]">
          {/* Header */}
          <div className="border-b-2 border-black dark:border-neutral-700 px-8 py-4 flex items-center justify-between bg-white dark:bg-neutral-900">
            <div className="flex items-center gap-4">
              <div className="font-bold text-black dark:text-white uppercase tracking-wider">Ocean Cleanup DAO</div>
              <span className="px-2 py-0.5 border border-black dark:border-neutral-600 text-black dark:text-neutral-300 text-[10px] font-bold uppercase tracking-widest">Active</span>
            </div>
            <div className="flex gap-4 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Treasury: <span className="text-black dark:text-white font-bold">$2,400,000</span></span>
              <span>Members: <span className="text-black dark:text-white font-bold">7</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x-2 divide-black dark:divide-neutral-700">
            {/* Main Content */}
            <div className="lg:col-span-2 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">Active Proposal</div>
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2 uppercase leading-tight">Fund Protocol Incubator Phase 2</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">Requesting $450k allocation for Q3 development grants.</p>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-1">Time Remaining</div>
                   <div className="font-mono text-lg font-bold text-black dark:text-white">22:14:05</div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Voting Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-black dark:text-white">Committee Votes</span>
                    <span className="text-neutral-500 dark:text-neutral-400">5/7 YES</span>
                  </div>
                  <div className="flex h-8 w-full border border-black dark:border-neutral-600 overflow-hidden bg-white dark:bg-neutral-800">
                    <div className="bg-black dark:bg-white w-[71%] flex items-center justify-center text-white dark:text-black text-[10px] font-bold uppercase tracking-widest">YES (71%)</div>
                    <div className="bg-neutral-100 dark:bg-neutral-700 w-[29%]"></div>
                  </div>
                </div>

                {/* Sentiment Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-black dark:text-white">Community Sentiment</span>
                    <span className="text-neutral-500 dark:text-neutral-400">93% Support</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                    <div className="bg-black dark:bg-white h-full w-[93%]"></div>
                  </div>
                  <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    $450k in tokens signaling YES
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="p-6 bg-neutral-50 dark:bg-neutral-800">
              <h4 className="font-bold text-black dark:text-white mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
                <PieChart className="w-4 h-4" /> Allocation
              </h4>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                   <span className="text-neutral-600 dark:text-neutral-300">Dev Grants</span>
                   <span className="text-black dark:text-white">40%</span>
                </div>
                <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600">
                  <div className="bg-black dark:bg-white h-full w-[40%]"></div>
                </div>

                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                   <span className="text-neutral-600 dark:text-neutral-300">Operations</span>
                   <span className="text-black dark:text-white">35%</span>
                </div>
                <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600">
                  <div className="bg-neutral-600 h-full w-[35%]"></div>
                </div>

                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                   <span className="text-neutral-600 dark:text-neutral-300">Marketing</span>
                   <span className="text-black dark:text-white">25%</span>
                </div>
                <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-600">
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
