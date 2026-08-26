import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-off-white px-5 py-16 text-ink flex items-center justify-center">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-red mb-5">404 · Page not found</p>
        <h1 className="font-display text-6xl md:text-8xl font-light leading-none mb-6">Lost in the details?</h1>
        <p className="text-sm text-smoke leading-relaxed mb-8">
          The page you’re looking for may have moved, but the work is still right where it belongs.
        </p>
        <Link
          href="/"
          className="inline-flex bg-brand-red text-off-white px-7 py-3.5 rounded-sm text-xs uppercase tracking-[0.1em] hover:bg-ink transition-colors"
        >
          Return to portfolio
        </Link>
      </div>
    </main>
  );
}
