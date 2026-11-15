import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { prepareDonationIndexes } from '@/lib/mongodb';
import { donationPurposes } from '@/lib/site';
import { paystackRequest } from '@/lib/paystack';
const purposes = donationPurposes.map((p) => p.value);
const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().max(30).optional(),
  amount: z.number().int().min(100).max(100000000),
  frequency: z.literal('one-time').default('one-time'),
  purpose: z.string().refine((v) => purposes.includes(v)),
  acceptTerms: z.literal('yes'),
});
export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const result = schema.safeParse(raw);
    if (!result.success)
      return NextResponse.json(
        { error: 'Please check your donation details.' },
        { status: 400 },
      );
    if (!process.env.PAYSTACK_SECRET_KEY || !process.env.MONGODB_URI)
      return NextResponse.json(
        {
          error:
            'Online payments are temporarily unavailable. Please contact us about your donation.',
        },
        { status: 503 },
      );
    const input = result.data;
    const reference = `CPJ-${randomUUID().replaceAll('-', '')}`;
    const amountKobo = input.amount * 100;
    const col = await prepareDonationIndexes();
    await col.insertOne({
      reference,
      amountKobo,
      currency: 'NGN',
      name: input.name,
      email: input.email.toLowerCase(),
      phone: input.phone || '',
      purpose: input.purpose,
      frequency: 'one-time',
      status: 'initialized',
      createdAt: new Date(),
    });
    const base =
      process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const payment = await paystackRequest<{
      authorization_url: string;
      reference: string;
    }>('/transaction/initialize', {
      method: 'POST',
      body: JSON.stringify({
        reference,
        amount: amountKobo,
        currency: 'NGN',
        email: input.email,
        callback_url: `${base}/donate/verify`,
        metadata: {
          name: input.name,
          purpose: input.purpose,
          source: 'cpj-foundation',
        },
      }),
    });
    if (
      payment.reference !== reference ||
      !payment.authorization_url.startsWith('https://checkout.paystack.com/')
    )
      throw new Error('Unexpected Paystack response');
    await col.updateOne({ reference }, { $set: { status: 'pending' } });
    return NextResponse.json({ authorizationUrl: payment.authorization_url });
  } catch (e) {
    console.error(
      'Checkout initialize failed',
      e instanceof Error ? e.message : e,
    );
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again later.' },
      { status: 503 },
    );
  }
}
