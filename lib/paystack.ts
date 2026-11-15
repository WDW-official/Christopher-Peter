import { createHmac, timingSafeEqual } from 'node:crypto';
export type PaystackTransaction = {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  customer?: { email?: string };
  metadata?: Record<string, unknown>;
};
function secret() {
  const value = process.env.PAYSTACK_SECRET_KEY;
  if (!value) throw new Error('Paystack secret key not configured');
  return value;
}
export async function paystackRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`https://api.paystack.co${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secret()}`,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    cache: 'no-store',
  });
  const json = await response.json();
  if (!response.ok || !json.status)
    throw new Error(json.message || 'Paystack request failed');
  return json.data as T;
}
function safeEqualHex(expected: string, received: string) {
  if (!/^[a-f\d]{128}$/i.test(received)) return false;
  const a = Buffer.from(expected, 'hex'),
    b = Buffer.from(received, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}
export function validWebhookSignature(raw: string, headers: Headers) {
  const modern = headers.get('paystack-signature');
  const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (modern) {
    if (!webhookSecret) return false;
    const items = modern.split(',').map((s) => s.trim());
    const timestamp = items.find((s) => s.startsWith('t='))?.slice(2);
    if (!timestamp || !/^\d+$/.test(timestamp)) return false;
    const t = Number(timestamp);
    if (!Number.isFinite(t) || Math.abs(Date.now() / 1000 - t) > 300)
      return false;
    const calculated = createHmac('sha512', webhookSecret)
      .update(`${timestamp}.${raw}`)
      .digest('hex');
    return items.some(
      (s) =>
        s.startsWith('v1=') &&
        safeEqualHex(calculated, s.slice(3).split(':').slice(1).join(':')),
    );
  }
  const legacy = headers.get('x-paystack-signature');
  if (!legacy || !process.env.PAYSTACK_SECRET_KEY) return false;
  const calculated = createHmac('sha512', secret()).update(raw).digest('hex');
  return safeEqualHex(calculated, legacy);
}
