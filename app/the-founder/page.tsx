import Link from 'next/link';
import { PageBanner } from '@/components/PageBanner';
export const metadata = { title: 'The Founder' };
export default function Page() {
  return (
    <>
      <PageBanner title="The Founder" />
      <section className="container-wrap section-pad grid gap-10 md:grid-cols-[35%_1fr]">
        <div className="glass-card self-start">
          <div className="flex aspect-[4/3] sm:aspect-[4/5] flex-col items-center justify-center bg-cream text-center">
            <div className="rounded-full bg-navy p-9 text-4xl font-black text-gold">
              CPJ
            </div>
            <p className="mt-5 px-6 text-sm">
              Approved portrait awaiting delivery
            </p>
          </div>
          <div className="p-5">
            <h2 className="font-black">Christopher Peter Jen</h2>
            <p className="text-sm text-leaf">
              Founder and Chairman (subject to approval)
            </p>
          </div>
        </div>
        <div>
          <h2 className="section-title">Christopher Peter Jen</h2>
          <p className="mt-5 leading-8 text-slate-700">
            Christopher Peter Jen founded the Foundation to widen access to
            skills and opportunities for people who face barriers to work and
            training. His experience in the Nigerian Correctional Service helped
            shape the Foundation’s interest in rehabilitation and the transition
            from custody to community life.
          </p>
          <p className="mt-5 leading-8 text-slate-700">
            He joined the service in 1991 and held operational and
            administrative posts across several state commands. In 2017, he was
            posted as Officer in Charge at Billiri Medium Security Custodial
            Centre in Gombe State. The centre’s historical profile credits him
            with introducing skills acquisition and literacy classes there.
          </p>
          <p className="mt-5 leading-8 text-slate-700">
            He holds a Higher National Diploma in Accounting and bachelor’s and
            master’s degrees in Public Administration from the University of
            Jos.
          </p>
          <div className="mt-7 rounded-xl border-l-4 border-gold bg-cream p-6">
            <h3 className="font-black">Message from the Founder</h3>
            <p className="mt-3 italic leading-7">
              “I want this Foundation to help people learn skills they can carry
              into work and community life.”
            </p>
            <p className="mt-3 text-xs">
              Proposed wording — obtain approval before publishing under the
              Founder’s name.
            </p>
          </div>
          <Link
            className="btn btn-blue mt-7"
            href="/our-programs#photo-code-initiative"
          >
            Explore the Billiri Archive →
          </Link>
        </div>
      </section>
    </>
  );
}
