import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/mongodb';
const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().max(30).optional(),
  subject: z.enum([
    'Training',
    'Donation',
    'Volunteer',
    'Sponsorship',
    'Partnership',
    'General Enquiry',
  ]),
  message: z.string().trim().min(10).max(3000),
});
export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const result = schema.safeParse(raw);
    if (!result.success)
      return NextResponse.json(
        { error: 'Please check the form details.' },
        { status: 400 },
      );
    const database = await db();
    await database
      .collection('enquiries')
      .insertOne({ ...result.data, createdAt: new Date(), status: 'new' });
    const recipient = process.env.CONTACT_EMAIL,
      apiKey = process.env.RESEND_API_KEY,
      from = process.env.RESEND_FROM_EMAIL;
    if (recipient && apiKey && from) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [recipient],
          subject: `Foundation enquiry: ${result.data.subject}`,
          text: `From: ${result.data.name} <${result.data.email}>\nPhone: ${result.data.phone || 'N/A'}\n\n${result.data.message}`,
        }),
      }).catch(() => {});
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          'The enquiry service is not configured or temporarily unavailable.',
      },
      { status: 503 },
    );
  }
}
