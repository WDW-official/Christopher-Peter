'use client';
import { useEffect, useRef, useState } from 'react';
import {
  X,
  ZoomIn,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { galleries, galleryCategories, type GalleryItem } from '@/lib/site';
import { displayPhoto } from '@/lib/media';

const categories: readonly string[] = galleryCategories;
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
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    modal?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus();
    };
  }, [isOpen]);
  const visible =
    filter === 'All'
      ? galleries
      : galleries.filter((g) => g.category === filter);
  const selectedIndex = selected ? visible.indexOf(selected) : -1;
  const navigate = (direction: number) => {
    setSelected((current) => {
      if (!current || visible.length < 2) return current;
      const index = visible.indexOf(current);
      return visible[(index + direction + visible.length) % visible.length];
    });
  };
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
            className="initiative-card interactive-card group h-full cursor-pointer overflow-hidden rounded-[20px] bg-navy text-left text-white"
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
              <p className="eyebrow mb-2 text-gold">{item.category}</p>
              <h3 className="font-extrabold">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-100">
                {item.caption}
              </p>
              {item.credit && (
                <p className="mt-4 border-t border-white/35 pt-3 text-sm leading-6 text-slate-200">
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
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
            return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            navigate(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
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
            <div
              style={{ touchAction: 'pan-y pinch-zoom' }}
              onTouchStart={(event) => {
                const touch = event.touches[0];
                swipeStart.current =
                  event.touches.length === 1
                    ? { x: touch.clientX, y: touch.clientY }
                    : null;
              }}
              onTouchCancel={() => {
                swipeStart.current = null;
              }}
              onTouchEnd={(event) => {
                const start = swipeStart.current;
                swipeStart.current = null;
                if (!start || event.touches.length > 0) return;
                const touch = event.changedTouches[0];
                const dx = touch.clientX - start.x;
                const dy = touch.clientY - start.y;
                if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                  navigate(dx < 0 ? 1 : -1);
                }
              }}
            >
              <img
                className="mx-auto max-h-[60dvh] max-w-full select-none object-contain"
                alt={selected.caption}
                src={displayPhoto(selected.image)}
                draggable={false}
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Previous image"
                disabled={visible.length < 2}
                onClick={() => navigate(-1)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded bg-white text-navy disabled:opacity-40"
              >
                <ChevronLeft aria-hidden="true" size={22} />
              </button>
              <p
                role="status"
                aria-atomic="true"
                className="text-center text-sm text-slate-200"
              >
                {selectedIndex + 1} of {visible.length}
                <span className="mt-1 block text-xs">
                  Swipe or use the arrows
                </span>
              </p>
              <button
                type="button"
                aria-label="Next image"
                disabled={visible.length < 2}
                onClick={() => navigate(1)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded bg-white text-navy disabled:opacity-40"
              >
                <ChevronRight aria-hidden="true" size={22} />
              </button>
            </div>
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
