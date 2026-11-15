'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Content stays visible without JavaScript or when reduced motion is preferred.
export function ScrollAnimations() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    let observer: IntersectionObserver | undefined;
    const clear = () => {
      observer?.disconnect();
      elements.forEach((element) => {
        delete element.dataset.revealState;
        element.style.removeProperty('--reveal-delay');
      });
    };
    const reveal = (element: HTMLElement) => {
      element.dataset.revealState = 'visible';
      observer?.unobserve(element);
    };
    const setup = () => {
      clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          });
        },
        { threshold: 0, rootMargin: '0px 0px -32px 0px' },
      );
      elements.forEach((element) => {
        const position = element.getBoundingClientRect();
        // Leave the initial viewport and any hash destination immediately readable.
        if (position.top < window.innerHeight) {
          return;
        }
        const siblings = element.parentElement?.querySelectorAll(
          ':scope > [data-reveal]',
        );
        const index = siblings ? Array.from(siblings).indexOf(element) : 0;
        element.style.setProperty(
          '--reveal-delay',
          `${Math.min(Math.max(index, 0), 3) * 55}ms`,
        );
        element.dataset.revealState = 'pending';
        observer?.observe(element);
      });
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      if (target instanceof Element) {
        const section = target.closest<HTMLElement>(
          '[data-reveal-state="pending"]',
        );
        if (section) reveal(section);
      }
    };
    setup();
    preference.addEventListener('change', setup);
    document.addEventListener('focusin', onFocus);
    return () => {
      clear();
      preference.removeEventListener('change', setup);
      document.removeEventListener('focusin', onFocus);
    };
  }, [pathname]);
  return null;
}
