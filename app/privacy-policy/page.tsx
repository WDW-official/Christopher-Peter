import { PageBanner } from '@/components/PageBanner';
export const metadata = { title: 'Privacy Policy' };
export default function Page() {
  return (
    <>
      <PageBanner title="Privacy Policy" />
      <section className="container-wrap section-pad">
        <div className="max-w-3xl rounded-xl border border-amber-300 bg-amber-50 p-6">
          <h2 className="text-xl font-black">
            Approved privacy notice required
          </h2>
          <p className="mt-4 leading-7">
            The Foundation must supply an approved privacy policy before the
            public website is launched. This implementation stores contact
            messages and donation references in MongoDB. Paystack processes
            payment details through its hosted checkout. This placeholder is not
            an approved legal policy.
          </p>
        </div>
      </section>
    </>
  );
}
