import Link from 'next/link';
import { ArrowUpRight, HandHeart } from 'lucide-react';
import { initiatives } from '@/lib/site';

export function InitiativeCard({
  item,
}: {
  item: (typeof initiatives)[number];
}) {
  return (
    <Link
      data-reveal
      href={`/our-programs#${item.id}`}
      className="glass-card interactive-card group flex h-full flex-col"
    >
      {item.image ? (
        <div
          className={`aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-48 ${item.credit ? 'bg-cream p-2' : ''}`}
        >
          <img
            src={item.image}
            width={1536}
            height={item.imageHeight}
            alt={item.imageAlt}
            loading="lazy"
            className={`h-full w-full transition duration-300 motion-safe:group-hover:scale-105 ${item.credit ? 'object-contain' : 'object-cover'}`}
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center lg:aspect-auto lg:h-48 justify-center bg-navy text-gold">
          <HandHeart size={62} strokeWidth={1.5} aria-hidden="true" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-start justify-between gap-2 text-lg font-extrabold">
          {item.title}
          <ArrowUpRight size={18} className="shrink-0 text-bright" />
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
        {item.credit && (
          <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500">
            {item.credit}
          </p>
        )}
      </div>
    </Link>
  );
}
