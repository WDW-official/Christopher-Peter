'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigation } from '@/lib/site';
import { Brand } from './Brand';
import { SupportLink } from './SupportLink';

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const onFocus = (event: FocusEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onFocus);
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onFocus);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);
  return (
    <header
      ref={header}
      className="site-header sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur"
    >
      <div className="container-wrap flex min-h-19 items-center justify-between gap-3 py-3 sm:gap-5">
        <Link
          href="/"
          aria-label="Foundation home"
          className="min-w-0"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              aria-current={path === item.href ? 'page' : undefined}
              className={`nav-link text-[13px] font-bold hover:text-bright ${path === item.href ? 'border-b-2 border-gold pb-1 text-navy' : 'text-navy'}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact-us"
            aria-current={path === '/contact-us' ? 'page' : undefined}
            className="nav-link text-[13px] font-bold"
          >
            Contact
          </Link>
          <SupportLink className="btn btn-gold !px-6 !py-3" href="/donate">
            Donate <ArrowUpRight size={15} />
          </SupportLink>
        </nav>
        <button
          ref={toggle}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={`menu-toggle flex size-11 shrink-0 items-center justify-center rounded-xl border lg:hidden ${open ? 'border-navy bg-navy text-white' : 'border-slate-200 bg-cream text-navy'}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div
        id="mobile-navigation"
        className="mobile-menu lg:hidden"
        data-open={open}
        inert={!open}
      >
        <nav
          className="container-wrap grid gap-1 py-4"
          aria-label="Mobile navigation"
        >
          {[
            ...navigation,
            { label: 'Contact Us', href: '/contact-us' },
            { label: 'Donate', href: '/donate' },
          ].map((item) => (
            <SupportLink
              onClick={() => setOpen(false)}
              aria-current={path === item.href ? 'page' : undefined}
              className={`flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-[15px] font-bold ${path === item.href ? 'bg-navy text-white' : item.href === '/donate' ? 'mt-2 bg-gold text-navy' : 'text-navy hover:bg-cream'}`}
              key={item.href}
              href={item.href}
            >
              {item.label}
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="opacity-60"
              />
            </SupportLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
