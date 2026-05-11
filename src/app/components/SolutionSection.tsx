import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Minus } from 'lucide-react';

export function SolutionSection() {
  const rows = [
    {
      feature: "Power Distribution",
      token: "Plutocratic (whales)",
      oneVote: "Democratic (KYC)",
      dx: "Elected committee, equal vote"
    },
    {
      feature: "Voter Identity",
      token: "Pseudonymous",
      oneVote: "Identity revealed",
      dx: "Pseudonymous, public votes"
    },
    {
      feature: "Decision Pipeline",
      token: "Off-chain debate, manual exec",
      oneVote: "Off-chain debate, manual exec",
      dx: "Signal → vote → timelock → auto-exec"
    },
    {
      feature: "Sybil Resistance",
      token: "Wealth-based",
      oneVote: "Identity-based",
      dx: "Election + small committee size"
    }
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 uppercase tracking-tighter">
            Fair Governance, <br /> Actually.
          </h2>
          <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">How <span className="normal-case">0xdx</span> compares to traditional models.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-6 px-4 text-black font-bold uppercase tracking-wider w-1/4">Feature</th>
                <th className="py-6 px-4 text-neutral-500 font-bold uppercase tracking-wider w-1/4">Token DAO</th>
                <th className="py-6 px-4 text-neutral-500 font-bold uppercase tracking-wider w-1/4">One-Person-One-Vote</th>
                <th className="py-6 px-4 text-black font-bold uppercase tracking-wider w-1/4 bg-neutral-50"><span className="normal-case">0xdx</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                  <td className="py-6 px-4 font-bold text-black uppercase tracking-wide text-sm">{row.feature}</td>
                  <td className="py-6 px-4 text-neutral-500 font-mono text-sm">{row.token}</td>
                  <td className="py-6 px-4 text-neutral-500 font-mono text-sm">{row.oneVote}</td>
                  <td className="py-6 px-4 font-bold text-black bg-neutral-50 flex items-center gap-2 uppercase tracking-wide text-sm">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    {row.dx}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
