'use client';
import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ExternalLink } from 'lucide-react';
import { galleries, type GalleryItem } from '@/lib/site';
import { displayPhoto } from '@/lib/media';

const categories = ['All', 'Training', 'Workshops', 'Solar', 'Billiri Archive'];
export function GalleryGrid({
  initialCategory = 'All',
}: {
  initialCategory?: string;
}) {
  const [filter, setFilter] = useState(
    categories.includes(initialCategory) ? initialCategory : 'All',
  );
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    modal?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus();
    };
  }, [selected]);
  const visible =
    filter === 'All'
      ? galleries
      : galleries.filter((g) => g.category === filter);
  return (
    <>
      <div
        aria-label="Filter photographs"
        className="gallery-filters mb-3 flex gap-2 overflow-x-auto pb-3"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
            className={`min-h-11 shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-bold ${filter === category ? 'border-gold bg-gold text-navy' : 'border-slate-300 bg-white text-navy hover:bg-cream'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <p role="status" className="mb-7 text-sm text-slate-500">
        {visible.length} photographs{filter !== 'All' ? ` · ${filter}` : ''}
      </p>
      <div className="grid items-start gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <button
            data-reveal
            type="button"
            key={item.image}
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setSelected(item);
            }}
            aria-label={`View ${item.title}`}
            className="glass-card interactive-card group h-full cursor-pointer text-left"
          >
            <div className="gallery-photo relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:h-60 bg-slate-100">
              <img
                alt={item.caption}
                src={displayPhoto(item.image)}
                loading="lazy"
                className={`h-full w-full transition duration-300 motion-safe:group-hover:scale-105 ${item.category === 'Billiri Archive' ? 'object-contain p-3' : 'object-contain'}`}
              />
              <ZoomIn
                aria-hidden="true"
                className="absolute bottom-3 right-3 rounded-lg bg-white p-1 text-navy shadow"
                size={29}
              />
            </div>
            <div className="p-5">
              <p className="eyebrow mb-2 text-leaf">{item.category}</p>
              <h3 className="font-extrabold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.caption}
              </p>
              {item.credit && (
                <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500">
                  {item.credit}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-labelledby="gallery-image-title"
        aria-describedby="gallery-image-caption"
        className="gallery-dialog"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
      >
        {selected && (
          <div className="mx-auto max-w-5xl p-4 sm:p-6">
            <div className="gallery-dialog-header mb-4 flex items-center justify-between gap-4">
              <h2 id="gallery-image-title" className="font-bold text-white">
                {selected.title}
              </h2>
              <button
                autoFocus
                type="button"
                aria-label="Close image viewer"
                className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded bg-white px-3 py-2 text-sm font-bold text-navy"
                onClick={() => setSelected(null)}
              >
                Close <X size={16} />
              </button>
            </div>
            <img
              className="mx-auto max-h-[60dvh] max-w-full object-contain"
              alt={selected.caption}
              src={displayPhoto(selected.image)}
            />
            <p
              id="gallery-image-caption"
              className="mt-4 text-sm leading-6 text-white"
            >
              {selected.caption}
            </p>
            {selected.credit && (
              <p className="mt-2 text-xs leading-5 text-slate-300">
                {selected.credit}
              </p>
            )}
            <a
              href={selected.image}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-gold underline"
            >
              Open original image <ExternalLink size={14} />
            </a>
          </div>
        )}
      </dialog>
    </>
  );
}
