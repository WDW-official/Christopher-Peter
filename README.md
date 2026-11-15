# Christopher Peter Jen Initiative — Next.js website

A responsive **Next.js App Router + TypeScript + Tailwind CSS v4** implementation of the supplied website brief and navy/gold mockup. Includes public information pages, an interactive gallery, support form modals, a contact form, Paystack hosted checkout, transaction verification and webhook signature checks.

## 1. Start locally

Requires Node.js 20.9+ and access to npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The mockup pages work without Paystack or MongoDB; form submission and online payment require configuration. Do not enable payments on an unapproved public site.

## 2. Database and enquiries

Set `MONGODB_URI` and `MONGODB_DB` in `.env.local`. Contact forms are stored in the `enquiries` collection. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL` to _also_ email the Foundation; otherwise entries are stored in MongoDB only. Set verified contact details in the UI when provided. Production should add request rate-limiting, spam protection, retention rules and administrative access controls. A completed enquiry response means it was stored, not necessarily that an email was delivered.

### Support form modals

Donate, Sponsor a Trainee, Volunteer and Partner actions open a shared accessible dialog on the current page. Donation and sponsorship forms preserve the chosen programme; volunteer and partnership enquiries preselect their subject. Header, footer and programme donation actions use the same dialog. Donation and sponsorship modals collect a single donor-entered amount, purpose, contact details and terms acceptance, then submit directly to Paystack checkout. Frequency and preset amount controls are not shown.

The standalone `/donate` page redirects to `/get-involved?support=donate` (or the sponsorship modal), retaining the supported purpose. It is excluded from the sitemap; `/donate/verify` remains available for Paystack’s return flow. Modal links can be opened in a new tab or bookmarked. Closing a deep-linked modal removes its modal query parameters.

`components/SupportModal.tsx` manages the dialog, scroll locking, Escape/backdrop closing and focus restoration. `SupportLink.tsx` provides action triggers, and `SupportQuery.tsx` handles modal URLs. Both form components accept initial values rather than depending on the current page’s search parameters. The ordinary Contact Us page remains available. Browser checks cover all four actions at 320, 390 and 1280px, correct defaults, keyboard focus, mobile navigation, legacy redirects and donation checkout validation. Submission checks use mocked responses to verify validation, payloads, success and error states without sending messages or initiating payments. The simplified donation form is checked at 320, 390 and 1280px, including consent, loading, retry, purpose selection, unsafe redirect rejection and a fully intercepted Paystack checkout handoff. Server initialization checks cover naira-to-kobo conversion, storage before checkout, invalid inputs, missing credentials, provider errors and reference mismatches.

## 3. Paystack setup

1. Configure the Foundation’s Paystack account and donation terms.
2. Set `PAYSTACK_SECRET_KEY=sk_test_...`, a MongoDB connection, and `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (on deployment use your real HTTPS origin).
3. Checkout is available once `PAYSTACK_SECRET_KEY` and `MONGODB_URI` are configured on the server. The old donation enable flags are no longer used. Missing credentials return a readable checkout error without starting a transaction.
4. In Paystack dashboard configure webhook URL `https://YOUR_DOMAIN/api/paystack/webhook`. If using modern `Paystack-Signature`, set `PAYSTACK_WEBHOOK_SECRET=whsec_...` (dashboard signing secret). If not provisioned yet, legacy `x-paystack-signature` with secret key is supported. Do **not** share secret keys in client-side code.
5. Test a successful payment, failed payment, pending status, replayed webhook, webhook mismatch, duplicate payment event, redirects and email confirmation before enabling **live** donations.
6. Change to an approved live secret only after the Foundation authorises live collection.

The form sends Paystack the validated amount in **kobo**, currency `NGN`, and an internal reference. The server stores a MongoDB record _before_ opening Paystack hosted checkout. The redirect (`/donate/verify`) checks the transaction using Paystack's server API and compares **reference, currency, amount, email** with the stored record. The webhook verifies the Paystack signature on the raw request body and separately retrieves the transaction from Paystack before changing its recorded status. The unique reference index and conditional updates make status writes idempotent.

**Donation amount:** Donors enter a whole-naira amount from ₦100 to ₦100,000,000. All donations are one-time payments; there are no frequency selectors or preset amount buttons. Older monthly links open the same one-time donation form. The server converts the validated amount to kobo before sending it to Paystack.

**Receipts:** The code records successful donations but does not send a custom acknowledgement email or manage refund notifications. Configure and test an approved one-per-donation acknowledgement workflow before production. Paystack may send its own transaction receipt depending on account settings.

## 4. Content and photography

The website now uses the supplied `Christopher_Peter_Jen_Foundation_Initiative_Write_Ups.docx` and Cloudinary photographs. `lib/media.ts` maps all **31 unique image URLs** to descriptive names; the repeated `79486.jpg` link is included once. `lib/site.ts` holds initiative copy, donation actions, gallery captions and newsletter introductions.

- Our Initiatives includes all three initiatives, training photo stories, the Photo Code Initiative, three newsletter introductions and Billiri trade/livelihood profiles.
- The gallery includes Training, Workshops, Solar and Billiri Archive filters. `/gallery?category=Billiri%20Archive` opens the historical collection. Full scans remain intact, and the image viewer links to each original.
- Historical images carry Nigerian Correctional Service, Billiri Medium Security Custodial Centre credits and the documented period where available. They illustrate the Foundation’s origins rather than current Foundation impact.
- `79486.jpg` shows the **first-edition** cover and profile. The second-edition introduction uses the supplied 2021 graduation photograph, not that cover.
- `79498.jpg` is retained as an original historical training register. Its caption notes that figures need reconciliation; no totals from that register are used as impact statistics.
- Women’s Empowerment is hidden from the public initiative lists, homepage highlights, programme navigation and donation purposes. The solar profile uses the supplied demonstration photograph and write-up. Solar screenshots and the additional tie-dye display use Cloudinary crops to remove interface borders in web views, while gallery links retain each original. Unprovided event photographs and source PDFs are not linked as if available.
- Homepage, About Us, Who We Serve and shared banners also use the supplied photographs. The old concept files under `public/images` are no longer referenced by the website.

Cloudinary images load from their supplied remote URLs. Preserve those URLs or update `lib/media.ts` if the assets move. Keep historical captions and credits attached when reusing archive images.

## 5. Design system

- Navy `#01154A` — hero, copy and footer
- Gold `#FEC722` — primary CTA
- White `#FFFFFF` — cards and backgrounds
- Bright blue `#0166FE` — secondary CTAs
- Green `#096E12` — programme highlights

The visible brand symbol is a **conceptual vector placeholder**, not an approved or reconstructed logo. Replace `components/Brand.tsx` after the actual approved logo has been supplied.

### Responsive layout and motion

The homepage hero blends its photograph into navy on desktop and uses the photograph behind the content with a dark overlay below 1024px. Mobile layouts use a compact header with an accessible menu, two-column homepage highlights, horizontally scrollable initiative/gallery filters and full-width primary action groups. Forms use 16px input text and controls at least 48px tall. Cards, content spacing, headlines, gallery dialogs and footer links adapt to smaller screens.

`components/ScrollAnimations.tsx` adds one-time scroll reveals to marked sections using IntersectionObserver. Content remains visible without JavaScript; keyboard focus reveals hidden sections. The hero, menu, image viewer and interactive cards have brief transitions. All animations and smooth scrolling respect `prefers-reduced-motion`, including preference changes while the page is open.

Browser verification covered 320, 375, 390, 768 and 1280px layouts, menu opening/closing and Escape focus return, the Solar gallery filter and image viewer, short landscape navigation, section links, reduced motion and content visibility without JavaScript. `npm run build` passes; Next.js retains advisory warnings about plain image elements.

## 6. Launch blockers / acceptance

- Approved Foundation name, CAC registration number, domain, address, email, phone and social accounts.
- Approved logo, founder title, biography, portrait and message.
- Confirm publication consent for the supplied correctional, participant and partner imagery; retain historical credits.
- Programme dates and eligibility confirmation; avoid using unverified Billiri counts (the developer brief notes a discrepancy).
- Approved privacy and donation terms; active provider, verified receipts, refunds and privacy handling.
- Production-grade rate limiting for API endpoints; email dispatch/alerts; donation receipts and monitoring.
- Mobile/desktop testing, accessibility, keyboard gallery, SEO canonical, SSL, webhooks and backup verification.

Validation commands: `npx tsc --noEmit` and `npm run build`. Forms and checkout still require the environment configuration and provider checks described above.

## 7. Directory map

- `app/page.tsx` — homepage
- `app/*/page.tsx` — remaining routes
- `components/*` — shared design and interactive elements
- `lib/site.ts` — editable content and donation purposes
- `app/api/donations/initialize/route.ts` — create Paystack checkout
- `app/api/paystack/webhook/route.ts` — verified payment event
- `app/donate/verify/page.tsx` — redirect status verification
- `app/api/contact/route.ts` — contact form storage and optional email notification
