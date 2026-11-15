import Link from 'next/link';
export function PageBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="banner">
      <div className="container-wrap w-full py-9 text-white">
        <p className="mb-3 text-xs font-semibold">
          <Link className="hover:text-gold" href="/">
            Home
          </Link>{' '}
          / {title}
        </p>
        <h1 className="page-title font-black tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-[15px] leading-6 text-slate-100">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
