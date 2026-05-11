import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Vote, Zap, Box, ArrowUpRight } from 'lucide-react';
import { Phase } from '../App';

export function ActivityFeed({ phase }: { phase: Phase }) {
  if (phase === 'prelaunch') return null;
  const isTestnet = phase === 'testnet';

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    // Initial data
    setActivities([
      { type: 'vote', actor: '0x7a...9f2', action: 'voted YES', target: isTestnet ? 'Test Prop #142' : 'Prop #142', time: '2s ago' },
      { type: 'proposal', actor: isTestnet ? 'EcoDAO_Test' : 'EcoDAO', action: 'created proposal', target: 'Treasury Swap', time: '12s ago' },
      { type: 'fund', actor: '0x3b...1a8', action: isTestnet ? 'received' : 'contributed', target: isTestnet ? '100 tETH (Faucet)' : '2.5 ETH to ArtCollab', time: '45s ago' },
      { type: 'execution', actor: 'System', action: 'executed', target: isTestnet ? 'Test Prop #139' : 'Prop #139', time: '1m ago' },
    ]);
  }, [phase]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = generateRandomActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [phase]); // Re-run generator logic when phase changes

  const generateRandomActivity = () => {
    const types = ['vote', 'proposal', 'fund', 'execution'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Testnet vs Mainnet Data
    const actors = isTestnet 
      ? ['0x1c...4a2', 'OceanDAO_Test', 'Builders_v2', '0x9d...2b1', 'Tester_01']
      : ['0x1c...4a2', 'OceanDAO', 'Builders_Collective', '0x9d...2b1', 'Anon_User'];
      
    const targets = isTestnet
      ? ['Test Prop #143', 'Dev Guild Funding', 'Charity Wallet', 'Test Prop #140', 'Marketing Budget']
      : ['Prop #143', 'Dev Guild Funding', 'Charity Wallet', 'Prop #140', 'Marketing Budget'];
    
    let action = '';
    if (type === 'vote') action = 'voted YES';
    else if (type === 'proposal') action = 'created proposal';
    else if (type === 'fund') action = isTestnet ? 'received 100 tETH' : 'contributed 5 ETH';
    else action = 'executed';

    return {
      type,
      actor: actors[Math.floor(Math.random() * actors.length)],
      action,
      target: targets[Math.floor(Math.random() * targets.length)],
      time: 'Just now'
    };
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'vote': return <Vote className="w-3 h-3" />;
      case 'proposal': return <Activity className="w-3 h-3" />;
      case 'fund': return <ArrowUpRight className="w-3 h-3" />;
      case 'execution': return <Zap className="w-3 h-3" />;
      default: return <Box className="w-3 h-3" />;
    }
  };

  const accentColor = isTestnet ? 'text-orange-400' : 'text-emerald-400';
  const pingColor = isTestnet ? 'bg-orange-400' : 'bg-emerald-400';
  const dotColor = isTestnet ? 'bg-orange-500' : 'bg-emerald-500';

  return (
    <div className="w-full bg-black text-white py-3 overflow-hidden border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${accentColor} shrink-0`}>
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-sm ${pingColor} opacity-75`}></span>
            <span className={`relative inline-flex rounded-sm h-2 w-2 ${dotColor}`}></span>
          </span>
          {isTestnet ? 'Testnet Live' : 'Live Network'}
        </div>
        
        <div className="h-4 w-px bg-neutral-800 mx-2" />

        <div className="flex-1 relative h-6 overflow-hidden" aria-live="polite" aria-atomic="false">
          <AnimatePresence mode="popLayout">
            {activities.map((activity, idx) => (
              <motion.div
                key={`${activity.time}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center gap-6 text-sm font-mono text-neutral-300"
              >
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500" aria-hidden="true">{getIcon(activity.type)}</span>
                  <span className="text-white font-bold uppercase tracking-wide text-xs">{activity.actor}</span>
                  <span className="text-xs uppercase tracking-wide">{activity.action}</span>
                  <span className="text-white border-b border-neutral-700 text-xs uppercase tracking-wide">{activity.target}</span>
                </div>
                <span className="text-neutral-600 text-[10px] hidden sm:inline-block font-mono uppercase">{activity.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
           <span>{isTestnet ? 'Goerli' : 'TPS: 4,203'}</span>
           <span>BLOCK: #8,921,003</span>
        </div>
      </div>
    </div>
  );
}
