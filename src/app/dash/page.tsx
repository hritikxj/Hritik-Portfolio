

import Image from '@/components/PortfolioImage';
import ProjectNav from '@/components/ProjectNav';
import ProjectFooter from '@/components/ProjectFooter';
import ProjectIntro from '@/components/ProjectIntro';

export default function DashBrandGuidelinesPage() {
  return (
    <div className={`min-h-screen bg-[#FAF9F5] text-[#1A1A1A] font-body selection:bg-[#FF6B35] selection:text-white`}>
      <ProjectNav background="#FAF9F5" tone="light" />

      {/* Hero Section */}
      <header id="main-content" tabIndex={-1} className="page-container page-enter pt-12 md:pt-20 pb-4 flex flex-col items-start text-left">
        <ProjectIntro
          eyebrow="Brand identity · Guidelines"
          title="Dash"
          lede="An identity system for an instant electronics delivery service, built around speed, reliability and urban reach."
          meta="Brand guidelines · 2026"
          accent="#AF390F"
          muted="#555555"
        />
        
        {/* Cover Slide (Slide 1) */}
        <div className="w-full mb-12 rounded-2xl overflow-hidden shadow-2xl border border-[#E5E0D5]/50 bg-white">
          <Image 
            src="/dash/dash-slide-1.png" 
            alt="Dash Brand Identity Cover Slide" 
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(100vw - 96px), 1200px"
          />
        </div>
      </header>

      <main className="page-container">
        
        {/* Specs Table */}
        <section className="mb-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 p-6 sm:p-8 rounded-2xl bg-[#F5F2EA] border border-[#E5E0D5]/40 shadow-sm text-center">
            <div>
              <span className="eyebrow text-[11px] text-[#AF390F] block mb-1 font-semibold">Role</span>
              <span className="text-sm text-[#1A1A1A] font-medium">Brand Designer & Strategist</span>
            </div>
            <div>
              <span className="eyebrow text-[11px] text-[#AF390F] block mb-1 font-semibold">Platform</span>
              <span className="text-sm text-[#1A1A1A] font-medium">Print & Digital</span>
            </div>
            <div>
              <span className="eyebrow text-[11px] text-[#AF390F] block mb-1 font-semibold">Type</span>
              <span className="text-sm text-[#1A1A1A] font-medium">Brand Guidelines</span>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#E5E0D5] my-10 max-w-7xl mx-auto" />

        {/* Project Context */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="w-full md:w-1/4 shrink-0">
              <p className="eyebrow text-[#AF390F] mb-3">Brief & Vision</p>
              <h2 className={`font-display tracking-[0.02em] text-3xl md:text-4xl text-[#1A1A1A] font-semibold`}>Tech Emergencies Obsolete</h2>
            </div>
            <div className="w-full md:w-3/4">
              <p className={`font-display tracking-[0.02em] text-2xl md:text-[32px] leading-[1.4] text-[#1A1A1A] mb-6`}>
                Dash is an instant delivery model for electronics, built on speed, reliability, innovation, and urban accessibility.
              </p>
              <p className={`font-body text-sm text-[#666666] leading-[1.8]`}>
                This brand identity deck translates technical infrastructure into a customer-first brand system. Scroll through the complete presentation guidelines below to view logomarks, typography rules, color formulas, and package mockups.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#E5E0D5] my-10 max-w-7xl mx-auto" />

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

                />
              </div>
            );
          })}
        </section>

        <hr className="border-t-[0.5px] border-[#E5E0D5] my-10 max-w-7xl mx-auto" />

        {/* Mascot Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-6">
            <div className="w-full md:w-1/4 shrink-0">
              <p className="eyebrow text-[#AF390F] mb-3">05 · Mascot System</p>
              <h2 className={`font-display tracking-[0.02em] text-3xl md:text-4xl text-[#1A1A1A] font-semibold`}>Chigma Boy</h2>
            </div>
            <div className="w-full md:w-3/4">
              <p className={`font-display tracking-[0.02em] text-2xl md:text-[32px] leading-[1.4] text-[#1A1A1A] mb-6`}>
                A friendly, tech-enabled neighborhood guide.
              </p>
              <p className={`font-body text-sm text-[#666666] leading-[1.8]`}>
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

        <hr className="border-t-[0.5px] border-[#E5E0D5] my-10 max-w-7xl mx-auto" />

        {/* Brand Application Mockups Bento Grid (Slides 24 to 28) */}
        <section className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 mb-12">
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

      <ProjectFooter current="/dash" />
    </div>
  );
}
