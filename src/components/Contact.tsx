'use client';

export default function Contact() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-brand-red px-[clamp(20px,4vw,40px)] py-5 flex flex-col sm:flex-row gap-4 items-center justify-between text-center sm:text-left">
        <span className="text-[13px] text-white/90">
          <strong className="text-off-white font-medium">Currently taking limited projects</strong> — Q2 2025 bookings open. 2 slots remaining.
        </span>
        <button onClick={() => scrollTo('contact')} className="text-[11px] text-off-white tracking-[0.1em] uppercase border-b-[0.5px] border-white/40 pb-0.5 cursor-pointer bg-transparent">
          Get in touch →
        </button>
      </div>

      <section id="contact" className="scroll-mt-16 px-[clamp(20px,4vw,40px)] py-[clamp(60px,8vw,100px)] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,6vw,80px)] items-start bg-ink">
        <div>
          <h2 className="font-display text-[clamp(48px,6vw,64px)] font-light leading-[1.05] text-off-white mb-6">Let's work<br/>together.</h2>
          <p className="text-[13px] text-white/40 leading-[1.8] mb-10">
            Looking for a designer who thinks strategically and delivers with craft? I'm selective about projects — which means yours gets full attention.
          </p>
          <div>
            <div className="flex justify-between items-center py-4.5 border-t-[0.5px] border-white/10 cursor-pointer transition-all duration-200 hover:pl-2 group">
              <span className="text-[13px] text-white/50 tracking-[0.06em] uppercase">Email</span>
              <div className="flex items-center">
                <span className="text-sm text-off-white mr-2">hritikjasnani@gmail.com</span>
                <span className="text-white/30 text-base transition-colors group-hover:text-off-white">↗</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4.5 border-t-[0.5px] border-white/10 cursor-pointer transition-all duration-200 hover:pl-2 group">
              <span className="text-[13px] text-white/50 tracking-[0.06em] uppercase">Instagram</span>
              <div className="flex items-center">
                <span className="text-sm text-off-white mr-2">@hritikjasnani</span>
                <span className="text-white/30 text-base transition-colors group-hover:text-off-white">↗</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4.5 border-t-[0.5px] border-white/10 cursor-pointer transition-all duration-200 hover:pl-2 group">
              <span className="text-[13px] text-white/50 tracking-[0.06em] uppercase">Portfolio</span>
              <div className="flex items-center">
                <span className="text-sm text-off-white mr-2">hritikjasnani.myportfolio.com</span>
                <span className="text-white/30 text-base transition-colors group-hover:text-off-white">↗</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <input className="bg-white/5 border-[0.5px] border-white/10 rounded-sm py-3.5 px-4 text-off-white font-body text-[13px] outline-none transition-colors duration-200 w-full placeholder:text-white/25 focus:border-white/30" type="text" placeholder="Your name" />
          <input className="bg-white/5 border-[0.5px] border-white/10 rounded-sm py-3.5 px-4 text-off-white font-body text-[13px] outline-none transition-colors duration-200 w-full placeholder:text-white/25 focus:border-white/30" type="text" placeholder="Company / Project" />
          <input className="bg-white/5 border-[0.5px] border-white/10 rounded-sm py-3.5 px-4 text-off-white font-body text-[13px] outline-none transition-colors duration-200 w-full placeholder:text-white/25 focus:border-white/30" type="text" placeholder="Budget range" />
          <textarea className="bg-white/5 border-[0.5px] border-white/10 rounded-sm py-3.5 px-4 text-off-white font-body text-[13px] outline-none transition-colors duration-200 w-full placeholder:text-white/25 focus:border-white/30 resize-y min-h-[100px]" placeholder="Tell me about your project…"></textarea>
          <button className="bg-off-white text-ink border-none py-3.5 px-8 font-body text-xs tracking-[0.08em] uppercase cursor-pointer rounded-sm self-start transition-colors duration-200 hover:bg-parchment mt-2">
            Send Enquiry →
          </button>
        </div>
      </section>
    </>
  );
}
