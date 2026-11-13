import React from 'react';
import { motion } from 'motion/react';
import { FileText, Scale, GitBranch, ArrowUpRight } from 'lucide-react';

export function BuiltInPublic() {
  return (
    <section className="py-16 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-5">
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4">07 / Built in Public</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9] text-black dark:text-white mb-6">
              One spec. <br />
              <span className="text-neutral-400 dark:text-neutral-500">Open source.</span> <br />
              MIT licensed.
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed border-l-2 border-black dark:border-neutral-400 pl-6">
              0xdx is currently a v1.0 specification, not a deployed product. The litepaper, the deterministic governance simulator, and this site are all open source. Contributions, issues, and adversarial critique are explicit goals of the prelaunch phase — the spec only gets better if it gets read carefully by people who disagree.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
          {[
            {
              icon: FileText,
              label: 'Specification',
              value: 'v1.0',
              meta: 'Published 2026-05-09',
            },
            {
              icon: Scale,
              label: 'License',
              value: 'MIT',
              meta: 'Permissive, no attribution gate',
            },
            {
              icon: GitBranch,
              label: 'Repository',
              value: 'github.com/russfranky/0xdx',
              meta: 'Issues open · PRs welcome',
              href: 'https://github.com/russfranky/0xdx',
            },
          ].map((item, idx) => {
            const body = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      {item.label}
                    </span>
                  </div>
                  {item.href && (
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors" aria-hidden="true" />
                  )}
                </div>
                <div className="text-2xl font-mono font-bold text-black dark:text-white tracking-tight break-all">
                  {item.value}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  {item.meta}
                </div>
              </>
            );
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white dark:bg-neutral-950 p-6 flex flex-col gap-3 h-full"
              >
                {body}
              </motion.div>
            );
            return item.href ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {inner}
              </a>
            ) : (
              <div key={idx}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
