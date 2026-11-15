import { PageBanner } from '@/components/PageBanner';
export const metadata = { title: 'Terms and Conditions' };
export default function Page() {
  return (
    <>
      <PageBanner title="Terms and Conditions" />
      <section className="container-wrap section-pad">
        <div className="max-w-3xl rounded-xl border border-amber-300 bg-amber-50 p-6">
          <h2 className="text-xl font-black">Approved terms required</h2>
          <p className="mt-4 leading-7">
            The Foundation must approve website terms, donation conditions and
            refunds policy before enabling checkout or launching publicly.
            Replace this development placeholder with the approved text.
          </p>
        </div>
      </section>
    </>
  );
}
