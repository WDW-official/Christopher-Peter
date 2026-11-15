import { photos, archiveCredit } from '@/lib/media';
import { ContentPage } from '@/components/ContentPage';
export const metadata = { title: 'About Us' };
export default function Page() {
  return (
    <ContentPage
      title="About Us"
      intro="Practical skills, opportunity and dignity."
      sections={[
        {
          title: 'Our Foundation',
          text: 'Christopher Peter Jen Initiative Skills Acquisition Foundation is a Nigerian nonprofit that promotes vocational education, entrepreneurship and sustainable community development. We work to make practical training more accessible to young people and underserved communities with fewer opportunities to learn a trade or earn a living.',
          image: photos.workshop2,
          imageAlt:
            'Participants watch a presenter beside a portrait drawing in an indoor workshop.',
        },
        {
          title: 'Our story',
          text: 'The Foundation was established by Christopher Peter Jen. His work in the Nigerian Correctional Service included supporting skills acquisition and literacy at Billiri Medium Security Custodial Centre. The Billiri records show people learning trades, practising in groups and completing literacy and trade assessments. That experience informs our focus on rehabilitation and economic opportunity.',
          image: photos.edition1,
          imageAlt:
            'Billiri’s first newsletter cover and officer-in-charge profile.',
          credit: archiveCredit('January 2018–January 2021'),
          action: { text: 'Meet the Founder', href: '/the-founder' },
        },
        {
          title: 'Our vision and mission',
          text: 'Vision: A society where people have a fair chance to gain skills, earn a living and contribute to their communities.\n\nMission: To make skills training more accessible, support entrepreneurship and develop programmes that improve livelihoods and reduce poverty.',
        },
        {
          title: 'How we work',
          text: 'Dignity: We respect people’s ability to learn and build a different future.\n\nPractical learning: We focus on skills useful in work, business and community life.\n\nAccountability: We value responsible governance and clear communication.',
          action: { text: 'Explore Our Initiatives', href: '/our-programs' },
        },
      ]}
    />
  );
}
