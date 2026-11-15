import { NextResponse } from 'next/server';
import {
  validWebhookSignature,
  paystackRequest,
  PaystackTransaction,
} from '@/lib/paystack';
import { prepareDonationIndexes } from '@/lib/mongodb';
export async function POST(request: Request) {
  const raw = await request.text();
  if (!validWebhookSignature(raw, request.headers))
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  try {
    const event = JSON.parse(raw);
    if (event.event !== 'charge.success')
      return NextResponse.json({ ok: true });
    const reference = event.data?.reference;
    if (typeof reference !== 'string' || !/^CPJ-[a-f\d]{32}$/.test(reference))
      return NextResponse.json({ ok: true });
    const col = await prepareDonationIndexes();
    const stored = await col.findOne({ reference });
    if (!stored) return NextResponse.json({ ok: true });
    const verified = await paystackRequest<PaystackTransaction>(
      `/transaction/verify/${encodeURIComponent(reference)}`,
    );
    if (
      verified.status !== 'success' ||
      verified.reference !== reference ||
      verified.currency !== 'NGN' ||
      verified.amount !== stored.amountKobo ||
      verified.customer?.email?.toLowerCase() !== stored.email
    )
      return NextResponse.json(
        { error: 'Payment details mismatch' },
        { status: 409 },
      );
    await col.updateOne(
      { reference, status: { $ne: 'success' } },
      {
        $set: {
          status: 'success',
          verifiedAt: new Date(),
          paystackId: event.data?.id || null,
        },
      },
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Webhook processing failed', e);
    return NextResponse.json({ error: 'Please retry' }, { status: 500 });
  }
}
