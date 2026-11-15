import { redirect } from 'next/navigation';
import { requestFromHref, supportUrl } from '@/lib/support';
export const metadata = {
  title: 'Support Our Work',
  robots: { index: false, follow: true },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ purpose?: string }>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (typeof params.purpose === 'string') query.set('purpose', params.purpose);
  const request = requestFromHref(`/donate?${query}`)!;
  redirect(supportUrl(request));
}
