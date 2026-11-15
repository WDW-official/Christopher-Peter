import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="container-wrap section-pad text-center">
      <h1 className="section-title">Page not found</h1>
      <p className="my-6">We couldn’t find that page.</p>
      <Link className="btn btn-gold" href="/">
        Go home
      </Link>
    </section>
  );
}
