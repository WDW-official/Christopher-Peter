import { SupportLink } from '@/components/SupportLink';
import { PageBanner } from '@/components/PageBanner';
import { Heart, Users, GraduationCap, Handshake } from 'lucide-react';
export const metadata = { title: 'How You Can Help' };
const options = [
  {
    id: 'donate',
    name: 'Make a donation',
    icon: Heart,
    copy: 'Help provide training tools, learning materials and practical sessions.',
    href: '/donate',
    cta: 'Donate Now',
  },
  {
    id: 'sponsor',
    name: 'Sponsor a trainee',
    icon: GraduationCap,
    copy: 'Support the materials and instruction needed to practise a trade.',
    href: '/donate?purpose=vocational-training',
    cta: 'Sponsor a Trainee',
  },
  {
    id: 'volunteer',
    name: 'Volunteer your time',
    icon: Users,
    copy: 'Share a skill, support a literacy session or mentor someone.',
    href: '/contact-us?subject=Volunteer',
    cta: 'Become a Volunteer',
  },
  {
    id: 'partner',
    name: 'Partner with us',
    icon: Handshake,
    copy: 'Help with equipment, expertise, mentoring or practical opportunities.',
    href: '/contact-us?subject=Partnership',
    cta: 'Partner With Us',
  },
];
export default function Page() {
  return (
    <>
      <PageBanner
        title="How You Can Help"
        subtitle="Donate, volunteer, sponsor or partner with the Foundation."
      />
      <section className="container-wrap section-pad">
        <h2 className="section-title">Help someone take the next step</h2>
        <p className="mt-5 max-w-3xl leading-7 text-slate-700">
          A training place, materials to practise with or time with an
          experienced mentor can help someone develop a skill and start planning
          for work.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {options.map(({ id, name, icon: Icon, copy, href, cta }) => (
            <div
              data-reveal
              id={id}
              key={id}
              className="glass-card scroll-mt-28 p-6"
            >
              <Icon size={37} className="text-leaf" />
              <h3 className="mt-5 text-xl font-black">{name}</h3>
              <p className="mt-3 lg:min-h-20 text-sm leading-6 text-slate-600">
                {copy}
              </p>
              <SupportLink href={href} className="btn btn-gold mt-5 w-full">
                {cta}
              </SupportLink>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
