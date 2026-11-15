import { SupportLink } from './SupportLink';
import { PageBanner } from './PageBanner';
type Section = {
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  credit?: string;
  id?: string;
  action?: { text: string; href: string };
};
export function ContentPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: Section[];
}) {
  return (
    <>
      <PageBanner title={title} subtitle={intro} />
      <div className="container-wrap section-pad space-y-12 md:space-y-16">
        {sections.map((section, i) => (
          <section
            data-reveal
            id={section.id}
            key={section.title}
            className={`scroll-mt-28 grid items-center gap-6 md:gap-9 ${section.image ? 'md:grid-cols-2' : 'max-w-4xl'}`}
          >
            <div className={i % 2 ? 'md:order-2' : ''}>
              <p className="eyebrow text-leaf">
                Christopher Peter Jen Initiative
              </p>
              <h2 className="section-title mt-3">{section.title}</h2>
              <p className="mt-5 whitespace-pre-line leading-8 text-slate-700">
                {section.text}
              </p>
              {section.action && (
                <SupportLink
                  className="btn btn-gold mt-6"
                  href={section.action.href}
                >
                  {section.action.text} →
                </SupportLink>
              )}
            </div>
            {section.image && (
              <figure>
                <img
                  className={`w-full rounded-2xl ${section.credit ? 'bg-cream object-contain' : 'aspect-[4/3] object-cover md:aspect-auto md:h-80'}`}
                  src={section.image}
                  alt={section.imageAlt || section.title}
                  loading="lazy"
                />
                {section.credit && (
                  <figcaption className="mt-3 text-xs leading-5 text-slate-500">
                    {section.credit}
                  </figcaption>
                )}
              </figure>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
