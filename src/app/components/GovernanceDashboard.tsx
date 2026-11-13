import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, TrendingUp, PieChart, Users, ChevronDown, Search, Plus, Eye } from 'lucide-react';
import { Button } from './ui/Button';
import { PageHeader } from './ui/PageHeader';
import { Phase } from '../App';

interface GovernanceDashboardProps {
  phase: Phase;
  onBack: () => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

const STATUS_BADGE: Record<Phase, { label: string; dotClass: string; textClass: string; bgClass: string }> = {
  prelaunch: {
    label: 'Preview · Mock Data',
    dotClass: 'bg-neutral-500',
    textClass: 'text-neutral-700 dark:text-neutral-300',
    bgClass: 'bg-neutral-100 dark:bg-neutral-800',
  },
  testnet: {
    label: 'Testnet Active',
    dotClass: 'bg-orange-500 animate-pulse',
    textClass: 'text-neutral-700 dark:text-neutral-300',
    bgClass: 'bg-neutral-100 dark:bg-neutral-800',
  },
  mainnet: {
    label: 'Mainnet Active',
    dotClass: 'bg-emerald-500 animate-pulse',
    textClass: 'text-neutral-700 dark:text-neutral-300',
    bgClass: 'bg-neutral-100 dark:bg-neutral-800',
  },
};

interface Proposal {
  id: number;
  title: string;
  author: string;
  status: 'active' | 'passed' | 'rejected' | 'queued';
  timeRemaining: string;
  committeeVotes: { yes: number; no: number; total: number };
  sentiment: { support: number; totalStaked: string };
  category: 'Grant' | 'Protocol' | 'Treasury';
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: "Fund Protocol Incubator Phase 2",
    author: "0x7a...4b1",
    status: 'active',
    timeRemaining: "22h 14m",
    committeeVotes: { yes: 5, no: 0, total: 7 },
    sentiment: { support: 93, totalStaked: "$450k" },
    category: 'Grant'
  },
  {
    id: 2,
    title: "Adjust Treasury Rebalancing Weights",
    author: "0x8b...2c9",
    status: 'active',
    timeRemaining: "4d 02h",
    committeeVotes: { yes: 2, no: 1, total: 7 },
    sentiment: { support: 65, totalStaked: "$1.2M" },
    category: 'Treasury'
  },
  {
    id: 3,
    title: "Onboard 'YieldX' as Approved Strategy",
    author: "0x1d...9e4",
    status: 'passed',
    timeRemaining: "Ended",
    committeeVotes: { yes: 7, no: 0, total: 7 },
    sentiment: { support: 98, totalStaked: "$2.5M" },
    category: 'Protocol'
  },
  {
    id: 4,
    title: "Emergency Pause of Bridge Contract",
    author: "Security_Committee",
    status: 'rejected',
    timeRemaining: "Ended",
    committeeVotes: { yes: 1, no: 6, total: 7 },
    sentiment: { support: 12, totalStaked: "$80k" },
    category: 'Protocol'
  }
];

export function GovernanceDashboard({ phase, onBack, theme, onThemeToggle }: GovernanceDashboardProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'passed'>('all');
  const isPreview = phase === 'prelaunch';
  const status = STATUS_BADGE[phase];

  const filteredProposals = MOCK_PROPOSALS.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <PageHeader
        onBack={onBack}
        title="Governance Dashboard"
        backLabel="Back"
        theme={theme}
        onThemeToggle={onThemeToggle}
        rightSlot={
          <>
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 ${status.bgClass} text-xs font-mono uppercase tracking-wider`}>
              <span className={`w-2 h-2 ${status.dotClass}`} />
              <span className={status.textClass}>{status.label}</span>
            </div>
            <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 hidden md:block" />
            <div className="flex items-center gap-2 pl-1">
              <div className="text-right hidden md:block">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider">
                  {isPreview ? 'No wallet' : '0x71...8a4'}
                </div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  {isPreview ? 'Preview' : 'Connected'}
                </div>
              </div>
              <div
                className="w-7 h-7 shrink-0 border border-neutral-200 dark:border-neutral-700"
                aria-hidden="true"
                style={
                  isPreview
                    ? { background: 'repeating-linear-gradient(45deg, #e5e5e5 0, #e5e5e5 3px, #f5f5f5 3px, #f5f5f5 6px)' }
                    : {
                        backgroundImage:
                          'conic-gradient(from 220deg at 35% 40%, #f59e0b 0deg, #ef4444 90deg, #6366f1 180deg, #10b981 270deg, #f59e0b 360deg)',
                      }
                }
              />
            </div>
          </>
        }
      />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">

        {isPreview && (
          <div className="mb-8 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-5 py-4 flex items-start gap-3">
            <Eye className="w-4 h-4 mt-0.5 shrink-0 text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
            <div className="text-sm leading-relaxed">
              <span className="font-bold text-black dark:text-white uppercase tracking-wider text-xs">Preview · No live data.</span>
              <span className="ml-2 text-neutral-600 dark:text-neutral-400">
                Everything below is mock data showing what the live governance dashboard will look like once the testnet ships. No real proposals, no real treasury, no wallet required.
              </span>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-center gap-3 mb-2 text-neutral-500 dark:text-neutral-400">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Active Stewards</span>
            </div>
            <div className="text-3xl font-mono font-medium text-black dark:text-white">7/9</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">98% Attendance Rate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-center gap-3 mb-2 text-neutral-500 dark:text-neutral-400">
              <PieChart className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Treasury Balance</span>
            </div>
            <div className="text-3xl font-mono font-medium text-black dark:text-white">$2,400,000</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">+$120k this month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-center gap-3 mb-2 text-neutral-500 dark:text-neutral-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Active Sentiment</span>
            </div>
            <div className="text-3xl font-mono font-medium text-black dark:text-white">$4.2M</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Total Staked Signal</div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-8">
          <div className="flex items-center gap-1 bg-white dark:bg-neutral-900 p-1 border border-neutral-200 dark:border-neutral-700">
            {(['all', 'active', 'passed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  filter === f
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search proposals..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10"
              />
            </div>
            <Button
              size="sm"
              className="shrink-0 font-bold uppercase tracking-wider"
              disabled={isPreview}
              title={isPreview ? 'Available at testnet launch' : undefined}
            >
              <Plus className="w-3.5 h-3.5" />
              {isPreview ? 'Preview only' : 'New Proposal'}
            </Button>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.map((proposal, idx) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                      proposal.status === 'active'
                        ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-900'
                        : proposal.status === 'passed'
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900'
                        : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900'
                    }`}>
                      {proposal.status}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">#{proposal.id.toString().padStart(3, '0')}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-[10px] uppercase tracking-wider">{proposal.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-1">{proposal.title}</h3>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                    by <span className="font-mono text-neutral-700 dark:text-neutral-300">{proposal.author}</span>
                    {proposal.status === 'active' && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
                          <Clock className="w-3 h-3" /> {proposal.timeRemaining} left
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Middle: Votes */}
                <div className="flex-1 lg:max-w-md space-y-4">
                  {/* Committee Vote */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">Committee</span>
                      <span className="text-neutral-500 dark:text-neutral-400">{proposal.committeeVotes.yes}/{proposal.committeeVotes.total} YES</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden flex">
                      <div
                        className="bg-black dark:bg-white h-full"
                        style={{ width: `${(proposal.committeeVotes.yes / proposal.committeeVotes.total) * 100}%` }}
                      />
                      <div
                        className="bg-red-500 h-full"
                        style={{ width: `${(proposal.committeeVotes.no / proposal.committeeVotes.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Sentiment Vote */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">Public Sentiment</span>
                      <span className="text-neutral-500 dark:text-neutral-400">{proposal.sentiment.support}% Bullish</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="bg-neutral-500 dark:bg-neutral-400 h-full"
                        style={{ width: `${proposal.sentiment.support}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Action */}
                <div className="flex items-center justify-end">
                  <Button variant="outline" size="sm" className="hidden lg:flex">
                    View Details <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  );
}
