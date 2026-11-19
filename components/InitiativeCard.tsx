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
      className="initiative-card interactive-card group flex h-full flex-col overflow-hidden rounded-[20px] bg-navy text-white"
    >
      {item.image ? (
        <div
          className={`aspect-[16/10] overflow-hidden bg-white ${item.credit ? 'p-2' : ''}`}
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
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="flex items-start justify-between gap-4 text-xl font-extrabold leading-snug">
          {item.title}
          <ArrowUpRight
            size={20}
            className="mt-1 shrink-0"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-4 text-base leading-7 text-slate-100">{item.desc}</p>
        {item.credit && (
          <p className="mt-4 border-t border-white/35 pt-3 text-sm leading-6 text-slate-200">
            {item.credit}
          </p>
        )}
      </div>
    </Link>
  );
}
