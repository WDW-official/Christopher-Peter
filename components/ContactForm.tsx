'use client';
import Link from 'next/link';
import { useState } from 'react';
import { contactSubjects, type EnquiryValues } from '@/lib/support';

type Props = {
  initialSubject?: string;
  initialValues?: EnquiryValues;
  embedded?: boolean;
  onNavigate?: () => void;
};
export function ContactForm({
  initialSubject = 'General Enquiry',
  initialValues = {},
  embedded = false,
  onNavigate,
}: Props) {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [subject, setSubject] = useState(
    contactSubjects.includes(initialSubject)
      ? initialSubject
      : 'General Enquiry',
  );
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setStatus('');
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Unable to send');
      setStatus('Thank you. Your enquiry has been received.');
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'Message could not be sent',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      data-reveal={embedded ? undefined : true}
      onSubmit={submit}
      aria-busy={busy}
      className={`grid gap-5 ${embedded ? '' : 'glass-card p-5 sm:p-8'}`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="field-label">Full name *</span>
          <input
            className="field"
            required
            minLength={2}
            name="name"
            autoComplete="name"
            defaultValue={initialValues.name}
          />
        </label>
        <label>
          <span className="field-label">Email *</span>
          <input
            type="email"
            className="field"
            required
            name="email"
            autoComplete="email"
            defaultValue={initialValues.email}
          />
        </label>
      </div>
      <label>
        <span className="field-label">Phone (optional)</span>
        <input
          className="field"
          name="phone"
          autoComplete="tel"
          type="tel"
          defaultValue={initialValues.phone}
        />
      </label>
      <label>
        <span className="field-label">Subject *</span>
        <select
          className="field"
          name="subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        >
          {contactSubjects.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="field-label">Your message *</span>
        <textarea
          required
          minLength={10}
          name="message"
          className="field min-h-36"
          defaultValue={initialValues.message}
          placeholder={
            subject === 'Volunteer'
              ? 'Tell us about your skills, interests and availability'
              : subject === 'Partnership'
                ? 'Tell us about your organisation and how you would like to partner'
                : 'Tell us how we can help'
          }
        />
      </label>
      <p className="text-xs leading-5 text-slate-600">
        By submitting, you consent to our handling your enquiry under our{' '}
        <Link
          onNavigate={onNavigate}
          className="text-bright underline"
          href="/privacy-policy"
        >
          privacy policy
        </Link>
        .
      </p>
      <button
        disabled={busy}
        className={`btn btn-gold w-full ${embedded ? '' : 'justify-self-start sm:w-auto'}`}
        type="submit"
      >
        {busy
          ? 'Sending…'
          : subject === 'Volunteer'
            ? 'Send volunteer enquiry'
            : subject === 'Partnership'
              ? 'Send partnership enquiry'
              : 'Send enquiry'}
      </button>
      {status && (
        <p
          role="status"
          className="rounded-lg bg-slate-100 p-4 text-sm leading-6"
        >
          {status}
        </p>
      )}
    </form>
  );
}
