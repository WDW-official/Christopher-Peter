import { photos, archiveCredit } from './media';

export const siteName =
  'Christopher Peter Jen Initiative Skills Acquisition Foundation';
export const siteDescription =
  'Skills, opportunity and independence through practical vocational training, literacy, livelihoods and rehabilitation in Nigeria.';
export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Initiatives', href: '/our-programs' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'How You Can Help', href: '/get-involved' },
];
export const initiatives = [
  {
    id: 'vocational-training',
    title: 'Vocational and Technical Skills Acquisition',
    desc: 'Hands-on learning in construction, technical trades, textiles and other crafts.',
    image: photos.surveying3,
    imageHeight: 1152,
    imageAlt:
      'Participants in hard hats and safety vests attend a quantity surveying session.',
    credit: '',
    icon: 'tools',
    purpose: 'vocational-training',
    action: 'Sponsor a Trainee',
    body: 'We promote hands-on learning in construction, technical trades, textiles and other crafts. Learners build confidence by practising the tasks a job requires, from reading a drawing and measuring a building layout to using equipment and finishing a product.',
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship and Business Development',
    desc: 'Costs, pricing, simple records and finding customers: turning a skill into an income.',
    image: photos.shoemaking2021,
    imageHeight: 950,
    imageAlt:
      'A Billiri newsletter spread shows carpentry, shoemaking and finished footwear.',
    credit: archiveCredit('2021'),
    icon: 'business',
    purpose: 'entrepreneurship',
    action: 'Support Entrepreneurship',
    body: 'A useful skill can become a service or product people will pay for. We aim to help learners work out their costs, set a price, keep simple records and find customers. We also seek support from mentors and businesses that can help people take their first steps into self-employment. Billiri’s shoemaking archive shows the range of finished work that practical training can produce.',
  },
  {
    id: 'community-development',
    title: 'Community Development and Livelihood Support',
    desc: 'Local partnerships that connect practical learning with community needs.',
    image: photos.livelihoods2022,
    imageHeight: 1070,
    imageAlt:
      'Billiri’s 2022 newsletter shows poultry, gardening, hand fans, barbing and electrical training.',
    credit: archiveCredit('2022'),
    icon: 'community',
    purpose: 'community-development',
    action: 'Support Community Development',
    body: 'Training can support a livelihood when it responds to local needs. We seek to work with community organisations, businesses and public institutions on practical learning and access to tools and materials. The Billiri garden, poultry and fishing records show how people can gain experience through everyday work in a shared space.',
  },
];

export type GalleryItem = {
  title: string;
  category: 'Training' | 'Workshops' | 'Solar' | 'Billiri Archive';
  image: string;
  caption: string;
  credit?: string;
};
export const galleries: GalleryItem[] = [
  {
    title: 'Quantity Surveying · Classroom',
    category: 'Training',
    image: photos.surveying3,
    caption:
      'Participants in safety vests and hard hats gather for an outdoor classroom session.',
  },
  {
    title: 'Quantity Surveying · Terms and Measurement',
    category: 'Training',
    image: photos.surveying6,
    caption:
      'A participant stands beside a whiteboard listing quantity surveying terms.',
  },
  {
    title: 'Quantity Surveying · Group Learning',
    category: 'Training',
    image: photos.surveying2,
    caption:
      'Participants sit together during the quantity surveying training session.',
  },
  {
    title: 'Quantity Surveying · Opening Session',
    category: 'Training',
    image: photos.surveying1,
    caption:
      'Uniformed presenters address participants at the training session.',
  },
  {
    title: 'Quantity Surveying · Presentation',
    category: 'Training',
    image: photos.surveying4,
    caption: 'A presenter speaks to the group during the training session.',
  },
  {
    title: 'Quantity Surveying · Discussion',
    category: 'Training',
    image: photos.surveying5,
    caption: 'A presenter holds a microphone beside the session’s whiteboard.',
  },
  {
    title: 'Quantity Surveying · Taking Notes',
    category: 'Training',
    image: photos.surveying7,
    caption: 'Participants write in notebooks during the training session.',
  },
  {
    title: 'Tie-Dye',
    category: 'Training',
    image: photos.tieDye,
    caption:
      'Participants work beside patterned tie-dye fabric laid out on the ground.',
  },
  {
    title: 'Tie-Dye · Finished Shirts',
    category: 'Training',
    image: photos.tieDye3,
    caption:
      'Participants stand beside a row of brightly patterned tie-dye shirts displayed along a fence.',
  },
  {
    title: 'Solar Panels · Meter Demonstration',
    category: 'Solar',
    image: photos.solar1,
    caption:
      'A demonstrator holds a meter beside the connections on the back of a solar panel.',
  },
  {
    title: 'Solar Panels · Panel and Connections',
    category: 'Solar',
    image: photos.solar2,
    caption:
      'A demonstrator holds a solar panel upright while working with its leads.',
  },
  {
    title: 'Solar Panels · Classroom Session',
    category: 'Solar',
    image: photos.solar3,
    caption:
      'Participants sit at desks facing a presenter and whiteboard during the solar training session.',
  },
  {
    title: 'Solar Panels · Practical Demonstration',
    category: 'Solar',
    image: photos.solar4,
    caption:
      'Two presenters demonstrate the panel’s leads and meter at the front of the classroom.',
  },
  {
    title: 'Solar Panels · Taking Readings',
    category: 'Solar',
    image: photos.solar5,
    caption:
      'A demonstrator holds a meter and solar panel while explaining the equipment to the group.',
  },
  {
    title: 'Indoor Workshop · Group Session',
    category: 'Workshops',
    image: photos.workshop2,
    caption:
      'Participants watch a presenter beside a portrait drawing and whiteboard sketches.',
  },
  {
    title: 'Indoor Workshop · Presentation',
    category: 'Workshops',
    image: photos.workshop3,
    caption:
      'A presenter leads an indoor session with participants seated close to the display.',
  },
  {
    title: 'Edition 1 · Cover and Profile',
    category: 'Billiri Archive',
    image: photos.edition1,
    caption: 'The first newsletter’s cover and officer-in-charge profile.',
    credit: archiveCredit('January 2018–January 2021'),
  },
  {
    title: 'Literacy Graduates',
    category: 'Billiri Archive',
    image: photos.literacyGraduates,
    caption:
      'A newsletter spread shows literacy graduates holding certificates, alongside a visit and presentation.',
    credit: archiveCredit('January 2018–January 2021'),
  },
  {
    title: 'Learning and Staff Archive',
    category: 'Billiri Archive',
    image: photos.learningArchive,
    caption:
      'A newsletter collage pairs classroom and trade activities with staff group photographs.',
    credit: archiveCredit(),
  },
  {
    title: 'Historical Training Register',
    category: 'Billiri Archive',
    image: photos.trainingRegister,
    caption:
      'An original newsletter table records training by trade and local government area. Its figures require reconciliation before use as impact totals.',
    credit: archiveCredit(),
  },
  {
    title: 'Carpentry and Shoemaking',
    category: 'Billiri Archive',
    image: photos.shoemaking2021,
    caption:
      'Learners practise carpentry and shoemaking; finished footwear is displayed alongside workshop photographs.',
    credit: archiveCredit('2021'),
  },
  {
    title: 'Caps, Cosmetology and Bags',
    category: 'Billiri Archive',
    image: photos.crafts2021,
    caption:
      'Training-unit photographs and finished caps, bags and cosmetology products.',
    credit: archiveCredit('2021'),
  },
  {
    title: 'Construction and Livelihoods',
    category: 'Billiri Archive',
    image: photos.livelihoods2021,
    caption:
      'Building construction, barbing, gardening and aluminium pot making in the Billiri training units.',
    credit: archiveCredit('2021'),
  },
  {
    title: 'Literacy and Trade-Test Graduation',
    category: 'Billiri Archive',
    image: photos.graduation2021,
    caption:
      'Groups gather for the 2021 literacy and Grade II Trade Test graduation.',
    credit: archiveCredit('2021'),
  },
  {
    title: 'Certificate Presentations',
    category: 'Billiri Archive',
    image: photos.certificates2021,
    caption: 'Learners receive literacy and Grade II Trade Test certificates.',
    credit: archiveCredit('2021'),
  },
  {
    title: 'Edition 3 · Cover',
    category: 'Billiri Archive',
    image: photos.edition3,
    caption:
      'The cover of the third Billiri newsletter, recording the centre’s 2022 activities.',
    credit: archiveCredit('2022'),
  },
  {
    title: 'Building and Cap Making',
    category: 'Billiri Archive',
    image: photos.building2022,
    caption:
      'Construction layout exercises and cap making in the Billiri training record.',
    credit: archiveCredit('2022'),
  },
  {
    title: 'Plumbing, Cosmetology and Pots',
    category: 'Billiri Archive',
    image: photos.plumbing2022,
    caption:
      'Learners practise pipe fitting, cosmetology and aluminium pot making.',
    credit: archiveCredit('2022'),
  },
  {
    title: 'Poultry, Gardening and Other Trades',
    category: 'Billiri Archive',
    image: photos.livelihoods2022,
    caption:
      'Poultry and garden activities appear alongside hand fans, barbing and electrical work.',
    credit: archiveCredit('2022'),
  },
  {
    title: 'Bags, Tailoring and Knitting',
    category: 'Billiri Archive',
    image: photos.textiles2022,
    caption:
      'Learners use textile equipment and display bags, garments and knitted work.',
    credit: archiveCredit('2022'),
  },
  {
    title: 'Recognition, Visits and Media',
    category: 'Billiri Archive',
    image: photos.recognition2022,
    caption:
      'A newsletter collage records recognition, visits and media coverage at Billiri.',
    credit: archiveCredit('2022'),
  },
];

export const archiveEditions = [
  {
    title: 'Edition 1',
    period: 'January 2018–January 2021',
    image: photos.edition1,
    caption: 'First-edition cover and officer-in-charge profile.',
    description:
      'The first issue introduces Billiri’s skills and literacy work and shows classroom visits, trades and literacy graduates.',
  },
  {
    title: 'Edition 2',
    period: 'January–December 2021',
    image: photos.graduation2021,
    caption: 'Literacy and trade-test graduation, 2021.',
    description:
      'The second issue follows the training units and records a literacy and trade-test graduation, a sewing-machine handover and learners teaching shoemaking.',
  },
  {
    title: 'Edition 3',
    period: 'January–December 2022',
    image: photos.edition3,
    caption: 'Third-edition newsletter cover.',
    description:
      'The third issue expands the visual record of the training units, with construction, craft, food production and education alongside another graduation.',
  },
];

export const donationPurposes = [
  { value: 'vocational-training', label: 'Vocational training' },
  { value: 'entrepreneurship', label: 'Entrepreneurship' },
  { value: 'community-development', label: 'Community development' },
  { value: 'youth-sponsorship', label: 'Youth sponsorship' },
  { value: 'general', label: 'Where most needed' },
];
export const formatNGN = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
