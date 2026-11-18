import Link from 'next/link';
import { SupportLink } from '@/components/SupportLink';
import { PageBanner } from '@/components/PageBanner';
import { initiatives, archiveEditions } from '@/lib/site';
import { photos, archiveCredit, displayPhoto } from '@/lib/media';

export const metadata = { title: 'Our Initiatives' };
const trainingProfiles = [
  {
    title: 'Quantity Surveying',
    category: 'Training',
    image: photos.surveying9,
    caption:
      'Presenters introduce surveying equipment beside an outdoor classroom whiteboard.',
    text: 'Before a building job can be priced, the work has to be described and measured. The training session introduces quantity surveying terms learners may encounter when reading building documents and recording quantities for a job.',
  },
  {
    title: 'Tie-Dye',
    category: 'Tie-Dye',
    image: photos.tieDye4,
    caption:
      'Colourful patterned garments are displayed along a fence after tie-dye work.',
    text: 'Learners use folds and ties to control where dye reaches fabric. Different ways of folding and tying create bands of colour and patterns that repeat across the cloth.',
  },
  {
    title: 'Solar Panels',
    category: 'Solar',
    image: photos.solar1,
    caption:
      'A demonstrator holds a meter beside the connections on the back of a solar panel.',
    text: 'In a classroom demonstration, participants look at solar panels, their connections and the meter used to take readings. Seeing the equipment up close gives learners a starting point for understanding the measurements used in solar work.',
  },
  {
    title: 'Indoor Workshop',
    category: 'Workshops',
    image: photos.workshop4,
    caption:
      'Participants gather around a presenter during an indoor workshop.',
    text: 'Group workshops give participants a place to listen, ask questions and share what they are learning. Classroom sessions complement practical work with tools and materials.',
  },
  {
    title: 'Building Construction',
    category: 'Construction',
    image: photos.construction4,
    caption: 'Learners and instructors stand beside a block foundation layout.',
    text: 'From reading a plan to setting out a foundation, construction practice connects classroom learning with work on site. Learners work together with blocks, measuring tools and string lines.',
  },
  {
    title: 'Knitting',
    category: 'Knitting',
    image: photos.knitting1,
    caption: 'Learners practise using a knitting machine with supervision.',
    text: 'Machine knitting brings together yarn, tension and repeated movements. Supervised practice helps learners become familiar with the equipment and the fabric it produces.',
  },
  {
    title: 'Tiling and Decorative Work',
    category: 'Tiling & Decorative',
    image: photos.tiling3,
    caption:
      'Participants in safety vests and hard hats attend a training session.',
    text: 'The construction skills training event brings participants and presenters together to discuss tiling and decorative work. Explore the gallery for photographs of the session and its speakers.',
  },
];
const tradeProfiles = [
  [
    'Building Construction',
    'Learners use a floor plan to set out the shape of a building on the ground. They work with string lines and levels to check their layout and position blocks, making the connection between a drawing and work on site.',
  ],
  [
    'Plumbing',
    'Work in the plumbing unit includes fitting pipes and planning where they run. The archive shows practice with pipe assemblies and examples of completed bathroom fittings.',
  ],
  [
    'Knitting',
    'Learners work with yarn and a knitting machine. Machine practice helps them see how tension and repeated movements affect the fabric they produce.',
  ],
  [
    'Shoe Making',
    'The shoemaking unit shows a learner using a finishing machine and a display of footwear made during training. The 2021 newsletter also describes learners passing the skill on to others.',
  ],
  [
    'Aluminium Pot Making',
    'Learners work with moulds in the Billiri pot-making unit. The archive follows the work through to examples of finished cookware.',
  ],
  [
    'Barbing',
    'Learners practise using clippers to carry out a haircut, gaining experience that can become the basis for an everyday service.',
  ],
  [
    'Gardening',
    'The garden gives learners regular practice tending crops and working together on a growing plot, with tasks useful in household or small-scale food production.',
  ],
  [
    'Fishing Unit',
    'The 2022 newsletter records a fishing unit alongside other food production activities at Billiri, with participants gathered around the unit’s tank.',
  ],
  [
    'Poultry',
    'The poultry unit adds experience with tending birds to the centre’s crop and fish activities. The archive shows participants inside the poultry space.',
  ],
  [
    'Textiles and Handcrafts',
    'Learners use sewing and knitting equipment, assemble bags, and work on caps, decorative clothing and hand fans. Finished pieces show the range of items and the detail involved.',
  ],
  [
    'Furniture and Other Trades',
    'Carpentry photographs show furniture making and finished upholstered pieces. Other records cover cosmetology, soap and petroleum jelly making, electrical and laundry work, and portrait drawings.',
  ],
];

export default function Page() {
  return (
    <>
      <PageBanner
        title="Our Initiatives"
        subtitle="Hands-on training, enterprise support and community livelihoods."
      />
      <section className="container-wrap section-pad">
        <p className="eyebrow text-leaf">
          Practical skills. Lasting opportunity.
        </p>
        <h2 className="section-title mt-3">
          Learning a trade. Building a livelihood.
        </h2>
        <p className="mt-5 max-w-3xl leading-8 text-slate-700">
          Learning a trade can give someone a way to earn a living, return to
          work or start a small business. The Foundation works to widen access
          to practical training and the support people need to use those skills.
          Our work is for young people seeking a start, communities building
          livelihoods, and people preparing to return to their communities after
          custody.
        </p>
        <nav
          aria-label="Explore initiatives"
          className="initiative-nav mt-7 flex gap-2 overflow-x-auto pb-3 md:flex-wrap"
        >
          {initiatives.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full border border-slate-200 px-4 py-3 text-sm font-bold hover:bg-cream"
            >
              {item.id === 'vocational-training'
                ? 'Vocational Skills'
                : item.id === 'entrepreneurship'
                  ? 'Entrepreneurship'
                  : 'Community Livelihoods'}
            </Link>
          ))}
          <Link
            href="#photo-code-initiative"
            className="shrink-0 rounded-full bg-navy px-4 py-3 text-sm font-bold text-white"
          >
            Photo Code Archive
          </Link>
        </nav>
        <div className="mt-9 space-y-12 md:mt-14 md:space-y-16">
          {initiatives.map((item, i) => (
            <section
              data-reveal
              key={item.id}
              id={item.id}
              className="initiative-card grid scroll-mt-28 overflow-hidden rounded-[20px] bg-navy text-white md:grid-cols-2"
            >
              {item.image && (
                <figure
                  className={`flex h-full items-center bg-white ${i % 2 ? 'md:order-2' : ''}`}
                >
                  <img
                    src={item.image}
                    width={1536}
                    height={item.imageHeight}
                    alt={item.imageAlt}
                    loading="lazy"
                    className={`w-full ${item.credit ? 'h-auto object-contain' : 'aspect-[16/10] object-cover md:aspect-auto md:h-full'}`}
                  />
                </figure>
              )}
              <div className="max-w-3xl p-6 sm:p-8">
                <h3 className="initiative-title font-black">{item.title}</h3>
                <p className="mt-4 leading-8 text-slate-100">{item.body}</p>
                {item.credit && (
                  <p className="mt-5 border-t border-white/35 pt-4 text-sm leading-6 text-slate-200">
                    {item.credit}
                  </p>
                )}
                <SupportLink
                  href={`/donate?purpose=${item.purpose}`}
                  className="btn btn-gold mt-6"
                >
                  {item.action} →
                </SupportLink>
              </div>
            </section>
          ))}
        </div>
      </section>
      <section className="bg-cream section-pad">
        <div className="container-wrap">
          <p className="eyebrow text-leaf">Learning in practice</p>
          <h2 className="section-title mt-3">Training photo stories</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trainingProfiles.map((item) => (
              <article
                data-reveal
                key={item.title}
                className="initiative-card flex flex-col overflow-hidden rounded-[20px] bg-navy text-white"
              >
                <figure>
                  <img
                    src={displayPhoto(item.image)}
                    alt={item.caption}
                    loading="lazy"
                    className="h-64 w-full bg-slate-100 object-contain"
                  />
                  <figcaption className="px-6 pt-4 text-sm leading-6 text-slate-300">
                    {item.caption}
                  </figcaption>
                </figure>
                <div className="p-6">
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-100">
                    {item.text}
                  </p>
                  <Link
                    href={`/gallery?category=${encodeURIComponent(
                      item.category,
                    )}`}
                    className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-gold underline"
                  >
                    View photographs
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Link href="/gallery" className="btn btn-outline mt-7">
            Explore the training gallery →
          </Link>
        </div>
      </section>
      <section
        id="photo-code-initiative"
        className="scroll-mt-28 bg-navy section-pad text-white"
      >
        <div className="container-wrap">
          <div className="grid items-center gap-7 md:gap-10 md:grid-cols-2">
            <div>
              <p className="eyebrow text-gold">Historical Billiri archive</p>
              <h2 className="section-title mt-3">Photo Code Initiative</h2>
              <p className="mt-5 leading-8 text-slate-100">
                The Photo Code Initiative brings together three editions of the
                Nigerian Correctional Service’s Billiri Medium Security
                Custodial Centre newsletter. The photographs follow people
                learning in custody as they read, practise a trade, use tools
                and show their finished work. The centre’s record of practical
                training and literacy under Officer in Charge Christopher Peter
                Jen helped shape the Foundation’s commitment to rehabilitation
                and reintegration.
              </p>
              <Link
                href="/gallery?category=Billiri%20Archive"
                className="btn btn-gold mt-6"
              >
                View the Archive Gallery →
              </Link>
            </div>
            <figure>
              <img
                src={photos.graduation2021}
                alt="Groups at Billiri’s 2021 literacy and Grade II Trade Test graduation."
                className="w-full rounded-xl bg-white object-contain"
                loading="lazy"
              />
              <figcaption className="mt-3 text-xs leading-5 text-slate-300">
                {archiveCredit('2021')}
              </figcaption>
            </figure>
          </div>
          <div className="mt-9 grid gap-7 md:mt-12 md:gap-8 md:grid-cols-3">
            {[
              [
                'Learning in the Classroom and Workshop',
                'At Billiri, classroom learning ran alongside work in the training units. Photographs show learners using a building plan, setting out construction work and practising knitting, plumbing and shoemaking. The second edition describes literacy and post-literacy classes as a way to help learners use what they know in work and business.',
              ],
              [
                'Literacy and Trade Certification',
                'The address for Billiri’s 2021 graduation listed 42 participants to receive certificates: 30 for literacy certificates and 12 for Grade II Trade Test certificates. The issue shows learners receiving and displaying their certificates. The 2022 issue records another graduation for literacy and the Grade II Trade Test.',
              ],
              [
                'Preparing for Life After Custody',
                'A person returning to their community may need a way to earn, tools to work with and people who can help. Billiri’s second edition describes shoemaking learners who went on to teach others and shows a sewing-machine handover. The third edition lists starter packs. The Foundation seeks to carry this approach forward through training and opportunities to put a skill to work.',
              ],
            ].map(([title, text]) => (
              <article
                data-reveal
                key={title}
                className="border-t border-white/25 pt-6"
              >
                <h3 className="text-xl font-bold text-gold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-200">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container-wrap section-pad">
        <p className="eyebrow text-leaf">
          Three editions. A record of learning.
        </p>
        <h2 className="section-title mt-3">Explore the newsletters</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {archiveEditions.map((item) => (
            <article data-reveal className="glass-card" key={item.title}>
              <img
                src={displayPhoto(item.image)}
                alt={item.caption}
                loading="lazy"
                className="h-64 w-full bg-cream p-4 object-contain"
              />
              <div className="p-6">
                <p className="eyebrow text-leaf">{item.period}</p>
                <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  {archiveCredit(item.period)}
                </p>
                <Link
                  href="/gallery?category=Billiri%20Archive"
                  className="mt-5 inline-block text-sm font-bold text-bright underline"
                >
                  View archive photographs →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-cream section-pad">
        <div className="container-wrap">
          <p className="eyebrow text-leaf">From the Billiri training record</p>
          <h2 className="section-title mt-3">Trades, crafts and livelihoods</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Classroom learning and hands-on work across the centre’s training
            units. Historical material: {archiveCredit('2018–2022')}.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tradeProfiles.map(([title, text]) => (
              <article
                data-reveal
                key={title}
                className="glass-card border-t-4 border-t-gold p-6"
              >
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
