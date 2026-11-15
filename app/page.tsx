import Link from 'next/link';
import { SupportLink } from '@/components/SupportLink';
import {
  ArrowRight,
  Heart,
  GraduationCap,
  HandHeart,
  BriefcaseBusiness,
} from 'lucide-react';
import { InitiativeCard } from '@/components/InitiativeCard';
import { initiatives } from '@/lib/site';
import { photos, archiveCredit } from '@/lib/media';
export default function Home() {
  return (
    <>
      <section className="home-hero bg-navy text-white">
        <div className="hero-inner mx-auto grid max-w-[1500px] lg:grid-cols-[49%_51%]">
          <div className="hero-copy relative z-10 flex flex-col justify-center px-5 py-10 sm:px-12 sm:py-16 lg:py-26 xl:pl-[max(54px,calc((100vw-1240px)/2))]">
            <p className="eyebrow text-gold">
              Christopher Peter Jen Initiative
            </p>
            <h1 className="hero-title mt-4 max-w-xl font-black tracking-[-.045em]">
              <span className="block">Skills. Opportunity.</span>
              <span className="block text-gold">Independence.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-100">
              A practical skill can help someone find work, start earning
              independently or begin again after a difficult period. We work to
              widen access to vocational learning, literacy and enterprise
              support for people in Nigeria who face barriers to those
              opportunities.
            </p>
            <div className="action-row mt-7 flex flex-wrap gap-3">
              <Link className="btn btn-gold" href="/our-programs">
                Explore Our Initiatives <ArrowRight size={17} />
              </Link>
              <Link
                className="btn border border-white bg-transparent text-white"
                href="/about-us"
              >
                Learn About Us
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img
              src={photos.surveying3}
              alt="Participants in safety vests and hard hats attend a quantity surveying session"
              className="image-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>
      <section className="impact-pillars container-wrap grid grid-cols-1 gap-x-5 gap-y-7 py-8 sm:grid-cols-3 sm:gap-7 md:py-9">
        {[
          {
            icon: GraduationCap,
            label: 'Vocational Training',
            desc: 'Practical skills for work and self-reliance.',
          },
          {
            icon: BriefcaseBusiness,
            label: 'Entrepreneurship',
            desc: 'Business knowledge and income opportunities.',
          },
          {
            icon: HandHeart,
            label: 'Community Livelihoods',
            desc: 'Training linked to real community needs.',
          },
        ].map(({ icon: Icon, label, desc }, i) => (
          <div
            data-reveal
            key={label}
            className={`grid grid-cols-[36px_1fr] items-center gap-x-3 px-2 text-left sm:block sm:text-center ${i ? 'md:border-l md:border-slate-200' : ''}`}
          >
            <Icon
              size={33}
              strokeWidth={2.5}
              className={`row-span-2 mx-auto sm:mb-3 ${i % 2 ? 'text-leaf' : 'text-bright'}`}
            />
            <h2 className="text-sm font-extrabold sm:text-base">{label}</h2>
            <p className="mt-2 text-sm leading-5 text-slate-600">{desc}</p>
          </div>
        ))}
      </section>
      <section className="bg-cream section-pad">
        <div className="container-wrap">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2 text-leaf">What we do</p>
              <h2 className="section-title">Our Initiatives</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Helping people build skills and turn learning into real
                opportunities.
              </p>
            </div>
            <Link
              className="text-sm font-bold text-bright underline"
              href="/our-programs"
            >
              View all initiatives →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((item) => (
              <InitiativeCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section className="container-wrap section-pad">
        <div
          data-reveal
          className="grid items-center gap-6 md:gap-10 rounded-2xl bg-[#F2F6FD] p-5 md:grid-cols-2 md:p-9"
        >
          <figure>
            <img
              className="w-full rounded-xl bg-white object-contain"
              src={photos.graduation2021}
              alt="Billiri literacy and trade-test graduation groups, 2021"
              loading="lazy"
            />
            <figcaption className="mt-3 text-xs leading-5 text-slate-500">
              {archiveCredit('2021')}
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow text-leaf">Rehabilitation & reintegration</p>
            <h2 className="section-title mt-3">
              Preparing for life after custody
            </h2>
            <p className="mt-5 leading-7 text-slate-700">
              A return to community life brings practical questions about work,
              income and where to turn for support. Training and literacy
              classes can give people a place to start. Explore the Photo Code
              Initiative to see how learners at Billiri Medium Security
              Custodial Centre practised trades, took part in classes and
              presented their work.
            </p>
            <Link
              className="btn btn-blue mt-6"
              href="/our-programs#photo-code-initiative"
            >
              Explore the Photo Code Initiative <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-navy py-12 text-white">
        <div className="container-wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black">
              Help someone take the next step
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-200">
              You can help provide training materials, share your skills or
              partner with us to create opportunities for trainees.
            </p>
          </div>
          <div className="action-row flex flex-wrap gap-3">
            <Link href="/get-involved" className="btn bg-white text-navy">
              See How You Can Help
            </Link>
            <SupportLink href="/donate" className="btn btn-gold">
              Donate <Heart size={17} />
            </SupportLink>
          </div>
        </div>
      </section>
    </>
  );
}
