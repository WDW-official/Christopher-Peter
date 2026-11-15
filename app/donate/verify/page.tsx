import Link from 'next/link';
import { paystackRequest, PaystackTransaction } from '@/lib/paystack';
import { prepareDonationIndexes } from '@/lib/mongodb';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Donation Status' };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const p = await searchParams;
  const reference = p.reference || p.trxref || '';
  let state = 'unconfirmed';
  if (/^[a-zA-Z0-9.=-]{5,110}$/.test(reference)) {
    try {
      const col = await prepareDonationIndexes();
      const stored = await col.findOne({ reference });
      if (stored) {
        const record = await paystackRequest<PaystackTransaction>(
          `/transaction/verify/${encodeURIComponent(reference)}`,
        );
        if (
          record.status === 'success' &&
          record.reference === reference &&
          record.currency === 'NGN' &&
          record.amount === stored.amountKobo &&
          record.customer?.email?.toLowerCase() === stored.email
        ) {
          await col.updateOne(
            { reference, status: { $ne: 'success' } },
            { $set: { status: 'success', verifiedAt: new Date() } },
          );
          state = 'success';
        } else if (
          ['ongoing', 'pending', 'processing', 'queued'].includes(record.status)
        )
          state = 'pending';
        else state = 'failed';
      }
    } catch {
      state = 'unconfirmed';
    }
  }
  return (
    <section className="container-wrap section-pad min-h-[60vh] text-center">
      <h1 className="section-title">
        {state === 'success'
          ? 'Thank you for your support'
          : state === 'pending'
            ? 'Payment is processing'
            : 'Donation not confirmed'}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-slate-600">
        {state === 'success'
          ? 'Your payment has been verified.'
          : state === 'pending'
            ? 'Your transaction is still processing. Please check again shortly.'
            : 'We could not verify a successful transaction. If money was deducted, please contact support with your reference.'}
      </p>
      {reference && (
        <p className="mt-5 font-mono text-xs">Reference: {reference}</p>
      )}
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn btn-gold">
          Home
        </Link>
        <Link href="/contact-us?subject=Donation" className="btn btn-outline">
          Contact support
        </Link>
      </div>
    </section>
  );
}
