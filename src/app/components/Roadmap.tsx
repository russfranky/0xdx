import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Clock, Loader2, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import { PageHeader } from './ui/PageHeader';

interface RoadmapProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

type Status = 'done' | 'in-progress' | 'planned';
type Category = 'Protocol' | 'Ecosystem' | 'Governance';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: Status;
  category: Category;
  quarter: string;
}

export function Roadmap({ onBack, theme, onThemeToggle }: RoadmapProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Litepaper & Framework',
      description: 'Publish the v1.0 litepaper specifying the committee model, lifecycle, treasury controls, and integrated DEX.',
      status: 'in-progress',
      category: 'Governance',
      quarter: 'Phase 1'
    },
    {
      id: '2',
      title: 'Reference Contracts',
      description: 'Open-source reference implementation of the governance, proposal, and treasury contracts.',
      status: 'planned',
      category: 'Protocol',
      quarter: 'Phase 1'
    },
    {
      id: '3',
      title: 'Security Audits',
      description: 'External audits of the core governance and treasury contracts before any public deployment.',
      status: 'planned',
      category: 'Protocol',
      quarter: 'Phase 2'
    },
    {
      id: '4',
      title: 'Public Testnet',
      description: 'Permissionless testnet for proposal submission, signaling, committee voting, and execution.',
      status: 'planned',
      category: 'Protocol',
      quarter: 'Phase 2'
    },
    {
      id: '5',
      title: 'Bootstrap Committee',
      description: 'Appointed bootstrap committee for the testnet phase, with publicly documented selection criteria.',
      status: 'planned',
      category: 'Governance',
      quarter: 'Phase 2'
    },
    {
      id: '6',
      title: 'Mainnet Genesis',
      description: 'Mainnet launch with permanent liquidity lock and the integrated DEX live for fee accrual.',
      status: 'planned',
      category: 'Protocol',
      quarter: 'Phase 3'
    },
    {
      id: '7',
      title: 'First Elected Committee',
      description: 'Transition from appointed bootstrap committee to a fully community-elected committee.',
      status: 'planned',
      category: 'Governance',
      quarter: 'Phase 3'
    },
    {
      id: '8',
      title: 'Ecosystem Grants',
      description: 'First grant cycle funded entirely by accrued DEX fees, no inflationary emissions.',
      status: 'planned',
      category: 'Ecosystem',
      quarter: 'Phase 3'
    }
  ];

  const categories: (Category | 'All')[] = ['All', 'Protocol', 'Governance', 'Ecosystem'];

  const filteredMilestones = selectedCategory === 'All'
    ? milestones
    : milestones.filter(m => m.category === selectedCategory);

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'done': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'in-progress': return <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />;
      case 'planned': return <Circle className="w-5 h-5 text-neutral-300 dark:text-neutral-600" />;
    }
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case 'done': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Upcoming';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <PageHeader onBack={onBack} title="Roadmap" theme={theme} onThemeToggle={onThemeToggle} />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Intro */}
        <div className="mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-black dark:text-white uppercase leading-[0.9]">
              Building the <br /> Republic
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 font-light leading-relaxed border-l-2 border-black dark:border-neutral-500 pl-6">
              We are building a governance system that lasts. Our roadmap prioritizes stability, security, and gradual decentralization over speed.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-black dark:border-neutral-700 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                selectedCategory === cat
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-transparent text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMilestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`relative p-8 border-t-2 ${
                milestone.status === 'done'
                  ? 'border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/10'
                  : milestone.status === 'in-progress'
                  ? 'border-orange-500 bg-orange-50/10 dark:bg-orange-950/10'
                  : 'border-neutral-200 dark:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
                  milestone.status === 'done' ? 'text-emerald-600 dark:text-emerald-400' :
                  milestone.status === 'in-progress' ? 'text-orange-600 dark:text-orange-400' : 'text-neutral-500 dark:text-neutral-400'
                }`}>
                  {milestone.quarter}
                </span>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  {getStatusIcon(milestone.status)}
                  <span className={
                    milestone.status === 'done' ? 'text-emerald-700 dark:text-emerald-400' :
                    milestone.status === 'in-progress' ? 'text-orange-700 dark:text-orange-400' : 'text-neutral-500 dark:text-neutral-400'
                  }>
                    {getStatusLabel(milestone.status)}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {milestone.title}
              </h3>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                {milestone.description}
              </p>

              <div className="mt-auto">
                 <span className="inline-block px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-wider">
                    {milestone.category}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
