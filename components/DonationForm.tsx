'use client';
import { useState } from 'react';
import Link from 'next/link';
import { donationPurposes } from '@/lib/site';
import { validPurpose } from '@/lib/support';

type Props = {
  initialPurpose?: string;
  onNavigate?: () => void;
};
export function DonationForm({
  initialPurpose = 'general',
  onNavigate,
}: Props) {
  const [purpose, setPurpose] = useState(validPurpose(initialPurpose));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    try {
      const response = await fetch('/api/donations/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, amount: Number(data.amount), purpose }),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.error || 'Could not start checkout');
      if (typeof body.authorizationUrl !== 'string')
        throw new Error('Could not open Paystack checkout. Please try again.');
      const checkout = new URL(body.authorizationUrl);
      if (checkout.origin !== 'https://checkout.paystack.com')
        throw new Error('Could not open Paystack checkout. Please try again.');
      window.location.assign(checkout.href);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Could not start payment',
      );
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} aria-busy={busy} className="space-y-5">
      <label className="block">
        <span className="field-label">Donation amount (NGN) *</span>
        <input
          className="field"
          name="amount"
          type="number"
          inputMode="numeric"
          min="100"
          max="100000000"
          step="1"
          required
          placeholder="Enter amount in naira"
          aria-describedby="donation-amount-help"
        />
        <span
          id="donation-amount-help"
          className="mt-2 block text-xs leading-5 text-slate-500"
        >
          Minimum donation: ₦100.
        </span>
      </label>
      <label className="block">
        <span className="field-label">What would you like to support?</span>
        <select
          className="field"
          name="purpose"
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
        >
          {donationPurposes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="field-label">Full name *</span>
          <input
            className="field"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
          />
        </label>
        <label>
          <span className="field-label">Email *</span>
          <input
            className="field"
            name="email"
            autoComplete="email"
            type="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label className="block">
        <span className="field-label">Phone (optional)</span>
        <input
          className="field"
          name="phone"
          autoComplete="tel"
          type="tel"
          maxLength={30}
        />
      </label>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          required
          name="acceptTerms"
          type="checkbox"
          value="yes"
          className="mt-1.5"
        />
        <span>
          I agree to the{' '}
          <Link
            onNavigate={onNavigate}
            className="text-bright underline"
            href="/terms-and-conditions"
          >
            donation terms
          </Link>{' '}
          and{' '}
          <Link
            onNavigate={onNavigate}
            className="text-bright underline"
            href="/privacy-policy"
          >
            privacy policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p
          className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}
      <button disabled={busy} type="submit" className="btn btn-gold w-full">
        {busy ? 'Connecting to Paystack…' : 'Pay with Paystack'}
      </button>
      <p className="text-center text-xs leading-5 text-slate-500">
        You’ll complete your payment securely on Paystack.
      </p>
    </form>
  );
}
