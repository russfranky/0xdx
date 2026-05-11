import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Minus } from 'lucide-react';

export function Comparison() {
  const data = [
    { feature: "Committee Voting", uniswap: "Token-weighted", compound: "Token-weighted", snapshot: "Off-chain signal", dx: "1-person-1-vote" },
    { feature: "Community Signal", uniswap: "Same as vote", compound: "Same as vote", snapshot: "Token-weighted", dx: "Token-weighted, non-binding" },
    { feature: "Execution", uniswap: "On-chain (manual)", compound: "On-chain (manual)", snapshot: "None (off-chain)", dx: "On-chain, automated" },
    { feature: "Treasury Funding", uniswap: "Inflationary tokens", compound: "Inflationary tokens", snapshot: "N/A", dx: "DEX fees + locked LP" },
    { feature: "Voter Identity", uniswap: "Pseudonymous", compound: "Pseudonymous", snapshot: "Pseudonymous", dx: "Pseudonymous" },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-2 uppercase tracking-tighter">Compare Models</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-4 pr-8 font-bold text-black uppercase tracking-wider">Feature</th>
                <th className="py-4 px-4 text-neutral-500 font-bold uppercase tracking-wider">Uniswap</th>
                <th className="py-4 px-4 text-neutral-500 font-bold uppercase tracking-wider">Compound</th>
                <th className="py-4 px-4 text-neutral-500 font-bold uppercase tracking-wider">Snapshot</th>
                <th className="py-4 px-4 text-black font-bold bg-neutral-100 uppercase tracking-wider"><span className="normal-case">0xdx</span></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-4 pr-8 font-bold text-black uppercase tracking-wide">{row.feature}</td>
                  <td className="py-4 px-4 text-neutral-500 font-mono">{row.uniswap}</td>
                  <td className="py-4 px-4 text-neutral-500 font-mono">{row.compound}</td>
                  <td className="py-4 px-4 text-neutral-500 font-mono">{row.snapshot}</td>
                  <td className="py-4 px-4 font-bold text-black bg-neutral-100 uppercase tracking-wide">{row.dx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
