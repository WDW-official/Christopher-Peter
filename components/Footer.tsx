import { Heart } from 'lucide-react';
import { Brand } from './Brand';
import { SupportLink } from './SupportLink';
export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-wrap grid grid-cols-2 gap-x-6 gap-y-9 py-12 md:grid-cols-4 md:gap-10 md:py-14">
        <div className="col-span-2">
          <Brand inverse />
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-200">
            Skills. Opportunity. Independence. We support practical skills
            training, entrepreneurship, literacy and sustainable livelihoods in
            Nigeria.
          </p>
          <SupportLink href="/donate" className="btn btn-gold mt-5">
            <Heart size={17} /> Support our work
          </SupportLink>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Explore</h3>
          <div className="footer-links grid text-sm text-slate-200">
            {[
              ['About Us', '/about-us'],
              ['The Founder', '/the-founder'],
              ['Our Initiatives', '/our-programs'],
              ['Who We Serve', '/who-we-serve'],
              ['Gallery', '/gallery'],
            ].map(([label, href]) => (
              <SupportLink className="hover:text-gold" href={href} key={href}>
                {label}
              </SupportLink>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Get involved</h3>
          <div className="footer-links grid text-sm text-slate-200">
            {[
              ['How You Can Help', '/get-involved'],
              ['Donate', '/donate'],
              ['Transparency & Partnerships', '/transparency-partnerships'],
              ['Contact Us', '/contact-us'],
              ['Privacy Policy', '/privacy-policy'],
              ['Terms & Conditions', '/terms-and-conditions'],
            ].map(([label, href]) => (
              <SupportLink className="hover:text-gold" href={href} key={href}>
                {label}
              </SupportLink>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-wrap flex flex-col justify-between gap-3 py-5 text-xs text-slate-300 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Christopher Peter Jen Initiative Skills
            Acquisition Foundation.
          </p>
          <p>Built around skills, opportunity and dignity.</p>
        </div>
      </div>
    </footer>
  );
}
