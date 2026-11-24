import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="page-enter min-h-screen bg-off-white px-5 py-16 text-ink flex items-center justify-center">
      <div className="max-w-xl text-center">
        <p className="eyebrow text-smoke mb-5">404 · Page not found</p>
        <h1 className="font-display text-6xl md:text-8xl font-semibold tracking-[0.01em] leading-none mb-6">Lost in the details?</h1>
        <p className="text-[16px] text-smoke leading-relaxed mb-8">
          The page you’re looking for may have moved, but the work is still right where it belongs.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-ink px-7 py-3.5 text-[14px] text-off-white transition-colors duration-300 hover:bg-ink/80"
        >
          Return to portfolio
        </Link>
      </div>
    </main>
  );
}
