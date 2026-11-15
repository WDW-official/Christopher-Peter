import { PageBanner } from '@/components/PageBanner';
import { GalleryGrid } from '@/components/GalleryGrid';
export const metadata = { title: 'Gallery' };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <>
      <PageBanner
        title="Gallery"
        subtitle="Practical learning, workshop sessions and the historical Billiri record."
      />
      <section className="container-wrap section-pad">
        <p className="eyebrow text-leaf">A closer look at learning</p>
        <h2 className="section-title mt-3">Skills, people and possibilities</h2>
        <p className="mt-5 max-w-3xl leading-8 text-slate-600">
          Explore quantity surveying, tie-dye, solar-panel demonstrations and
          indoor workshop photographs, alongside the Photo Code Initiative’s
          historical newsletter archive. Select a photograph to see the full
          image and its caption.
        </p>
        <p className="mb-8 mt-4 max-w-3xl border-l-4 border-gold pl-4 text-sm leading-6 text-slate-600">
          Billiri archive images document the Nigerian Correctional Service’s
          training and literacy work at Billiri Medium Security Custodial
          Centre. Their captions identify the historical source and period;
          these records helped shape the Foundation’s commitment to
          rehabilitation and reintegration.
        </p>
        <GalleryGrid initialCategory={category} />
      </section>
    </>
  );
}
