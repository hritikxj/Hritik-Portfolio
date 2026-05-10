'use client';

import Reveal from './Reveal';

export default function Contact() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-brand-red py-5">
        <div className="w-full px-5 md:px-12 lg:px-10 flex flex-col sm:flex-row gap-4 items-center justify-between text-center sm:text-left">
        <Reveal>
          <span className="text-[13px] text-white/90 block">
            <strong className="text-off-white font-medium">Currently taking limited projects</strong> — Q2 2025 bookings open. 2 slots remaining.
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <button onClick={() => scrollTo('contact')} className="text-[11px] text-off-white tracking-[0.1em] uppercase border-b-[0.5px] border-white/40 pb-0.5 cursor-pointer bg-transparent">
            Get in touch →
          </button>
        </Reveal>
        </div>
      </div>

      <section id="contact" className="scroll-mt-16 py-10 md:py-16 lg:py-20 bg-ink">
        <div className="w-full px-5 md:px-12 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <div>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-off-white mb-6">Let's work<br/>together.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[13px] text-white/40 leading-[1.8] mb-10">
              Looking for a designer who thinks strategically and delivers with craft? I'm selective about projects — which means yours gets full attention.
            </p>
          </Reveal>
          <div className="flex flex-col">
            <Reveal delay={0.3}>
              <a href="mailto:hritikjasnani.design@gmail.com?subject=Design%20Project%20Inquiry&body=Hi%20Hritik,%0A%0AI%20came%20across%20your%20work%20and%20I%20am%20interested%20in%20collaborating%20with%20you%20on%20a%20design%20project.%0A%0AHere%20is%20a%20brief%20overview%20of%20what%20I%20am%20looking%20for:%0A%0AProject%20Type:%20%0ATimeline:%20%0ABudget:%20%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards,%0A%5BYour%20Name%5D" className="flex justify-between items-center py-4.5 border-t-[0.5px] border-white/10 cursor-pointer transition-all duration-200 hover:pl-2 group no-underline">
                <span className="text-[13px] text-white/50 tracking-[0.06em] uppercase">Email</span>
                <div className="flex items-center">
                  <span className="text-sm text-off-white mr-2">hritikjasnani@gmail.com</span>
                  <span className="text-white/30 text-base transition-colors group-hover:text-off-white">↗</span>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.4}>
              <a href="https://instagram.com/hritikjasnani" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center py-4.5 border-t-[0.5px] border-white/10 cursor-pointer transition-all duration-200 hover:pl-2 group no-underline">
                <span className="text-[13px] text-white/50 tracking-[0.06em] uppercase">Instagram</span>
                <div className="flex items-center">
                  <span className="text-sm text-off-white mr-2">@hritikjasnani</span>
                  <span className="text-white/30 text-base transition-colors group-hover:text-off-white">↗</span>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Reveal delay={0.2}><input className="bg-white/5 border-[0.5px] border-white/10 rounded-sm py-3.5 px-4 text-off-white font-body text-[13px] outline-none transition-colors duration-200 w-full placeholder:text-white/25 focus:border-white/30" type="text" placeholder="Your name" /></Reveal>
          <Reveal delay={0.3}><input className="bg-white/5 border-[0.5px] border-white/10 rounded-sm py-3.5 px-4 text-off-white font-body text-[13px] outline-none transition-colors duration-200 w-full placeholder:text-white/25 focus:border-white/30" type="text" placeholder="Company / Project" /></Reveal>
          <Reveal delay={0.4}><input className="bg-white/5 border-[0.5px] border-white/10 rounded-sm py-3.5 px-4 text-off-white font-body text-[13px] outline-none transition-colors duration-200 w-full placeholder:text-white/25 focus:border-white/30" type="text" placeholder="Budget range" /></Reveal>
          <Reveal delay={0.5}><textarea className="bg-white/5 border-[0.5px] border-white/10 rounded-sm py-3.5 px-4 text-off-white font-body text-[13px] outline-none transition-colors duration-200 w-full placeholder:text-white/25 focus:border-white/30 resize-y min-h-[100px]" placeholder="Tell me about your project…"></textarea></Reveal>
          <Reveal delay={0.6}>
            <button className="bg-off-white text-ink border-none py-3.5 px-8 font-body text-xs tracking-[0.08em] uppercase cursor-pointer rounded-sm self-start transition-colors duration-200 hover:bg-parchment mt-2">
              Send Enquiry →
            </button>
          </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
