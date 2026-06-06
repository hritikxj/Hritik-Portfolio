'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useHireMe } from './HireMeProvider';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { handleHireMeClick } = useHireMe();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollTo = (id: string) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Client-side navigation; IntroScene skips the intro on return visits
      // because the sessionStorage flag is already set.
      router.push(`/#${id}`);
    }
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="border-b-[0.5px] border-border-subtle bg-off-white">
        <div className="w-full flex justify-between items-center px-5 md:px-12 lg:px-10 py-4">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="font-display text-lg font-normal tracking-[0.02em] text-ink no-underline hover:opacity-70 transition-opacity duration-200"
          >
            Hritik Jasnani
          </Link>

          <ul className="hidden md:flex gap-8 list-none items-center">
            <li><button onClick={() => scrollTo('about')} className="text-xs text-smoke tracking-[0.08em] uppercase transition-colors duration-200 hover:text-ink cursor-pointer">About</button></li>
            <li><button onClick={() => scrollTo('services')} className="text-xs text-smoke tracking-[0.08em] uppercase transition-colors duration-200 hover:text-ink cursor-pointer">Services</button></li>
            <li><button onClick={handleHireMeClick} className="bg-brand-red text-off-white px-6 py-2.5 rounded-sm tracking-[0.06em] text-xs transition-colors duration-200 hover:bg-ink cursor-pointer inline-block">Hire Me →</button></li>
          </ul>

          <div className="md:hidden flex items-center">
            <button onClick={handleHireMeClick} className="bg-brand-red text-off-white px-5 py-2.5 rounded-sm tracking-[0.06em] text-[11px] transition-colors duration-200 hover:bg-ink cursor-pointer inline-block">Hire Me</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
