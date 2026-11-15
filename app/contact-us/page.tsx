import { PageBanner } from '@/components/PageBanner';
import { ContactForm } from '@/components/ContactForm';
export const metadata = { title: 'Contact Us' };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Ask us about training, donations, volunteering and partnerships."
      />
      <section className="container-wrap section-pad grid gap-8 lg:gap-12 lg:grid-cols-[38%_1fr]">
        <div>
          <h2 className="section-title">Let’s start a conversation</h2>
          <p className="mt-5 leading-7 text-slate-700">
            Tell us how you would like to be involved so we can direct your
            enquiry to the right person.
          </p>
          <p className="mt-7 rounded-xl bg-cream p-5 text-sm">
            Official phone, email and WhatsApp links will be added after the
            Foundation confirms them.
          </p>
        </div>
        <ContactForm key={subject} initialSubject={subject} />
      </section>
    </>
  );
}
