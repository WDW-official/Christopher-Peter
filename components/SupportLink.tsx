'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { requestFromHref, supportUrl } from '@/lib/support';
import { useSupportModal } from './SupportModal';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };
export function SupportLink({ href, onClick, children, ...props }: Props) {
  const { openSupport } = useSupportModal();
  const request = requestFromHref(href);
  return (
    <Link
      {...props}
      href={request ? supportUrl(request) : href}
      aria-haspopup={request ? 'dialog' : undefined}
      onClick={(event) => {
        onClick?.(event);
        if (
          !request ||
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.currentTarget.target === '_blank'
        )
          return;
        event.preventDefault();
        openSupport(request, event.currentTarget);
      }}
    >
      {children}
    </Link>
  );
}
