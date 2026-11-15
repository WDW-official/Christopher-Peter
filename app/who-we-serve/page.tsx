import { photos } from '@/lib/media';
import { ContentPage } from '@/components/ContentPage';
export const metadata = { title: 'Who We Serve' };
export default function Page() {
  return (
    <ContentPage
      title="Who We Serve"
      intro="Learning opportunities for people who face barriers to work and training."
      sections={[
        {
          title: 'Young people seeking work',
          text: 'We want more young Nigerians to have access to practical learning and a clearer route towards employment or self-employment.',
          image: photos.surveying3,
          imageAlt:
            'Participants attend a quantity surveying session in hard hats and safety vests.',
        },
        {
          title: 'Underserved communities',
          text: 'We seek to widen access to training, enterprise support and opportunities that can be used close to home.',
        },
        {
          title: 'People rebuilding after custody',
          text: 'We believe people should have a fair chance to learn, take responsibility and contribute to their communities.',
          action: {
            text: 'Ask About Training',
            href: '/contact-us?subject=Training',
          },
        },
      ]}
    />
  );
}
