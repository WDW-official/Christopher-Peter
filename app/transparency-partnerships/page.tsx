import { ContentPage } from '@/components/ContentPage';
export const metadata = { title: 'Transparency and Partnerships' };
export default function Page() {
  return (
    <ContentPage
      title="Transparency and Partnerships"
      sections={[
        {
          title: 'Our commitment to accountability',
          text: 'We are committed to responsible governance and to explaining how support is used. We welcome partners who can help widen access to vocational training, entrepreneurship, education and community development in Nigeria.\n\nApproved CAC registration documents, annual reports and financial statements will be linked here when supplied and authorised.',
        },
        {
          title: 'Partnerships',
          id: 'partnerships',
          text: 'Businesses, training providers, community groups and institutions can contribute equipment, instruction, mentoring and practical work opportunities.',
          action: {
            text: 'Enquire About Partnership',
            href: '/contact-us?subject=Partnership',
          },
        },
      ]}
    />
  );
}
