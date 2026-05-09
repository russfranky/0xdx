import { ArrowUpRight } from 'lucide-react';

interface ResourcesProps {
  onLitepaperClick?: () => void;
  onRoadmapClick?: () => void;
}

export function Resources({ onLitepaperClick, onRoadmapClick }: ResourcesProps) {
  const resources = [
    {
      title: 'Litepaper',
      desc: 'The full v1.0 specification — governance model, lifecycle, treasury, security.',
      onClick: onLitepaperClick,
    },
    {
      title: 'Roadmap',
      desc: 'Phased launch plan from spec draft to mainnet.',
      onClick: onRoadmapClick,
    },
    {
      title: 'GitHub',
      desc: 'Source code, reference contracts, and issue tracker.',
      href: 'https://github.com',
    },
  ];

  return (
    <section className="py-28 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((item, idx) => {
            const inner = (
              <>
                <div className="flex items-center justify-between mb-4 border-b-2 border-neutral-200 pb-4 group-hover:border-black transition-colors">
                  <h3 className="font-bold text-lg text-black uppercase tracking-wide">{item.title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-black transition-colors" />
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed font-light text-left">
                  {item.desc}
                </p>
              </>
            );
            return item.href ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block cursor-pointer"
              >
                {inner}
              </a>
            ) : (
              <button
                key={idx}
                onClick={item.onClick}
                className="group cursor-pointer block w-full text-left"
              >
                {inner}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
