'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cormorant_Garamond, Jost, Montserrat } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const totalSlides = 28;

export default function DashBrandGuidelinesPage() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF9F5] text-[#1A1A1A] ${jost.className} selection:bg-[#FF6B35] selection:text-white pb-20`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:px-12 lg:px-10 md:py-6 bg-[#FAF9F5]/90 backdrop-blur-sm border-b-[0.5px] border-[#E5E0D5]">
        <Link href="/" onClick={handleBack} className="text-[#1A1A1A] hover:text-[#FF6B35] transition-colors uppercase tracking-[0.2em] text-xs font-medium no-underline">
          ← Back to Portfolio
        </Link>
        <div className={`uppercase tracking-[0.3em] text-[10px] text-[#FF6B35] ${jost.className} font-semibold`}>
          Brand Identity
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-36 px-5 md:px-12 lg:px-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className={`${montserrat.className} text-6xl md:text-8xl lg:text-[110px] font-extrabold tracking-tight text-[#1A1A1A] mb-6 leading-none`}>
          DASH
        </h1>
        <p className={`${cormorant.className} italic text-[#666666] text-xl md:text-2xl max-w-3xl mb-16`}>
          Brand Guidelines · Ultra-Fast Electronics Delivery · 2026
        </p>
        
        {/* Cover Slide (Slide 1) */}
        <div className="w-full mb-24 rounded-2xl overflow-hidden shadow-2xl border border-[#E5E0D5]/50 bg-white">
          <Image 
            src="/dash/dash-slide-1.png" 
            alt="Dash Brand Identity Cover Slide" 
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-12 lg:px-10">
        
        {/* Specs Table */}
        <section className="mb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 p-6 sm:p-8 rounded-2xl bg-[#F5F2EA] border border-[#E5E0D5]/40 shadow-sm text-center">
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#FF6B35] block mb-1 font-semibold">Role</span>
              <span className="text-sm text-[#1A1A1A] font-medium font-sans">Brand Designer & Strategist</span>
            </div>
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#FF6B35] block mb-1 font-semibold">Platform</span>
              <span className="text-sm text-[#1A1A1A] font-medium font-sans">Print & Digital</span>
            </div>
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#FF6B35] block mb-1 font-semibold">Type</span>
              <span className="text-sm text-[#1A1A1A] font-medium font-sans">Brand Guidelines</span>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#E5E0D5] mb-20 max-w-7xl mx-auto" />

        {/* Project Context */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="w-full md:w-1/4 shrink-0">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#FF6B35] mb-3 font-semibold">Brief & Vision</p>
              <h2 className={`${cormorant.className} text-3xl md:text-4xl text-[#1A1A1A] font-light`}>Tech Emergencies Obsolete</h2>
            </div>
            <div className="w-full md:w-3/4">
              <p className={`${cormorant.className} text-2xl md:text-[32px] leading-[1.4] text-[#1A1A1A] mb-6`}>
                Dash is an instant delivery model for electronics, built on speed, reliability, innovation, and urban accessibility.
              </p>
              <p className={`${jost.className} text-sm text-[#666666] leading-[1.8] font-light`}>
                This brand identity deck translates technical infrastructure into a customer-first brand system. Scroll through the complete presentation guidelines below to view logomarks, typography rules, color formulas, and package mockups.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#E5E0D5] mb-24 max-w-7xl mx-auto" />

        {/* Stacked Slides (Slides 2 to 23, skipping slide 17 which is the mascot close-up) */}
        <section className="flex flex-col gap-8 md:gap-12 lg:gap-16 mb-12">
          {Array.from({ length: 22 }).map((_, idx) => {
            const slideNum = idx + 2; // Start from slide 2
            if (slideNum === 17) return null; // Skip slide 17 as it is shown in the mascot section
            return (
              <div 
                key={slideNum} 
                className="w-full rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D5]/40 bg-white"
              >
                <Image
                  src={`/dash/dash-slide-${slideNum}.png`}
                  alt={`Dash Brand Guideline Slide ${slideNum}`}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority={slideNum <= 5} // Eagerly load the first few slides
                />
              </div>
            );
          })}
        </section>

        <hr className="border-t-[0.5px] border-[#E5E0D5] mb-24 max-w-7xl mx-auto" />

        {/* Mascot Section */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-16">
            <div className="w-full md:w-1/4 shrink-0">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#FF6B35] mb-3 font-semibold">05 — Mascot System</p>
              <h2 className={`${cormorant.className} text-3xl md:text-4xl text-[#1A1A1A] font-light`}>Chigma Boy</h2>
            </div>
            <div className="w-full md:w-3/4">
              <p className={`${cormorant.className} text-2xl md:text-[32px] leading-[1.4] text-[#1A1A1A] mb-6`}>
                A friendly, tech-enabled neighborhood guide.
              </p>
              <p className={`${jost.className} text-sm text-[#666666] leading-[1.8] font-light`}>
                Chigma Boy is the official brand mascot of Dash, representing our delivery partners on the ground. Styled in the signature electric blue suit and orange safety helmet, he embodies speed, accessibility, and friendly, human-centric tech support in every neighborhood.
              </p>
            </div>
          </div>

          {/* Mascot Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Mascot Turnaround */}
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E5E0D5]/50 bg-white flex items-center justify-center p-4 relative aspect-square">
              <Image 
                src="/dash/mascot.jpg" 
                alt="Dash Mascot - Chigma Boy Turnaround" 
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Mascot Close-up */}
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E5E0D5]/50 bg-white flex items-center justify-center p-4 relative aspect-square">
              <Image 
                src="/dash/dash-slide-17.png" 
                alt="Dash Mascot - Chigma Boy Close-up" 
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#E5E0D5] mb-24 max-w-7xl mx-auto" />

        {/* Brand Application Mockups Bento Grid (Slides 24 to 28) */}
        <section className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 mb-32">
          {/* Slide 26 (Vertical mockup, spans 2 rows on the left) */}
          <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D5]/40 bg-white aspect-[3/4] md:aspect-auto relative">
            <Image
              src="/dash/dash-slide-26.png"
              alt="Dash Mockup Slide 26"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Slide 24 - Row 1 Right 1 */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D5]/40 bg-white aspect-[4/3] relative">
            <Image
              src="/dash/dash-slide-24.png"
              alt="Dash Mockup Slide 24"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Slide 25 - Row 1 Right 2 */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D5]/40 bg-white aspect-[4/3] relative">
            <Image
              src="/dash/dash-slide-25.png"
              alt="Dash Mockup Slide 25"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Slide 27 - Row 2 Right 1 */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D5]/40 bg-white aspect-[4/3] relative">
            <Image
              src="/dash/dash-slide-27.png"
              alt="Dash Mockup Slide 27"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Slide 28 - Row 2 Right 2 */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D5]/40 bg-white aspect-[4/3] relative">
            <Image
              src="/dash/dash-slide-28.png"
              alt="Dash Mockup Slide 28"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </section>

      </main>

      <footer className="text-center mt-40 mb-12 px-5 md:px-12 lg:px-10">
        <p className="text-[11px] tracking-[0.3em] text-[#666666] uppercase">
          © {new Date().getFullYear()} DASH India · Brand Identity Guidelines
        </p>
      </footer>
    </div>
  );
}
