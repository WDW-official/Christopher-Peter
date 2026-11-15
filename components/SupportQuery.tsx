'use client';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { requestFromQuery } from '@/lib/support';
import { useSupportModal } from './SupportModal';

// Open bookmarked modal URLs and legacy /donate redirects without a separate page.
export function SupportQuery() {
  const params = useSearchParams();
  const query = params.toString();
  const lastQuery = useRef<string | null>(null);
  const { openSupport } = useSupportModal();
  useEffect(() => {
    if (query === lastQuery.current) return;
    lastQuery.current = query;
    const request = requestFromQuery(new URLSearchParams(query));
    if (request) openSupport(request);
  }, [query, openSupport]);
  return null;
}
