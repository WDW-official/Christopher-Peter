import { donationPurposes } from './site';

export type EnquiryValues = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};
export type SupportRequest = {
  kind: 'donate' | 'sponsor' | 'volunteer' | 'partner' | 'enquiry';
  purpose?: string;
  subject?: string;
  values?: EnquiryValues;
};
export const contactSubjects = [
  'Training',
  'Donation',
  'Volunteer',
  'Sponsorship',
  'Partnership',
  'General Enquiry',
];
export function validPurpose(value: string | null | undefined) {
  return donationPurposes.some((p) => p.value === value) ? value! : 'general';
}
export function requestFromHref(href: string): SupportRequest | null {
  if (!href.startsWith('/') || href.startsWith('//')) return null;
  const url = new URL(href, 'https://foundation.local');
  if (url.pathname === '/donate') {
    const purpose = validPurpose(url.searchParams.get('purpose'));
    return {
      kind: purpose === 'vocational-training' ? 'sponsor' : 'donate',
      purpose,
    };
  }
  if (url.pathname === '/contact-us') {
    const subject = url.searchParams.get('subject');
    if (subject === 'Volunteer') return { kind: 'volunteer', subject };
    if (subject === 'Partnership') return { kind: 'partner', subject };
    if (subject === 'Donation' || subject === 'Sponsorship')
      return { kind: 'enquiry', subject };
  }
  return null;
}
export function supportUrl(request: SupportRequest) {
  const params = new URLSearchParams({ support: request.kind });
  if (request.purpose) params.set('purpose', request.purpose);
  if (request.subject) params.set('subject', request.subject);
  return `/get-involved?${params}`;
}
export function requestFromQuery(
  params: URLSearchParams,
): SupportRequest | null {
  const kind = params.get('support');
  if (kind === 'donate' || kind === 'sponsor')
    return {
      kind,
      purpose:
        kind === 'sponsor'
          ? 'vocational-training'
          : validPurpose(params.get('purpose')),
    };
  if (kind === 'volunteer') return { kind, subject: 'Volunteer' };
  if (kind === 'partner') return { kind, subject: 'Partnership' };
  if (kind === 'enquiry')
    return {
      kind,
      subject:
        params.get('subject') === 'Sponsorship' ? 'Sponsorship' : 'Donation',
    };
  return null;
}
