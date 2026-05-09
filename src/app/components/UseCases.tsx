import React from 'react';
import { motion } from 'motion/react';
import { Phase } from '../App';

export function UseCases({ phase }: { phase: Phase }) {
  const isTestnet = phase === 'testnet';
  const isPrelaunch = phase === 'prelaunch';

  const projects = [
    {
      title: "Research DAOs",
      type: "Example",
      desc: "Coordinated funding and direction for open research — grants, milestone reviews, and treasury-managed compute, governed by an elected committee.",
      logo: "RD"
    },
    {
      title: "Impact / Public-Goods DAOs",
      type: "Example",
      desc: "Crowdfunded local or global initiatives where committee-led decisions and auto-executed disbursements replace manual treasurer overhead.",
      logo: "IM"
    },
    {
      title: "Grants / Education DAOs",
      type: "Example",
      desc: "Treasury-backed grant programs with on-chain proposals, signaling, and automated payouts — fees from the integrated DEX keep the program perpetual.",
      logo: "GR"
    }
  ];

  return (
    <section className="py-28 bg-neutral-50 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black max-w-xl uppercase leading-[0.9]">
            {isPrelaunch ? <>Where <span className="normal-case">0xdx</span> fits.</> : isTestnet ? 'Early adopters building the future.' : 'Powering the next generation of organizations.'}
          </h2>
          {/* Ecosystem index link will be added once testnet/mainnet ships. */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-8 border-2 border-transparent hover:border-black transition-all duration-300"
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-sm mb-8">
                {project.logo}
              </div>

              <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">{project.type}</div>
              <h3 className="text-xl font-bold text-black mb-4 group-hover:underline decoration-2 underline-offset-4">{project.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-8">
                {project.desc}
              </p>

              <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isPrelaunch ? 'text-neutral-500' : isTestnet ? 'text-orange-600' : 'text-black'}`}>
                <span className={`w-2 h-2 rounded-sm ${isPrelaunch ? 'bg-neutral-400' : isTestnet ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                {isPrelaunch ? 'Reference Use Case' : isTestnet ? 'Deployed on Testnet' : 'Live on Mainnet'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
