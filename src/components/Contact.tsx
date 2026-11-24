'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { EMAIL, useHireMe } from './HireMeProvider';

const socials = [
  { label: 'Instagram', handle: '@hritikjasnani', href: 'https://instagram.com/hritikjasnani' },
  { label: 'LinkedIn', handle: 'in/hritikjasnani', href: 'https://www.linkedin.com/in/hritikjasnani/' },
];

export default function Contact() {
  const { handleHireMeClick } = useHireMe();
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied('copied');
    } catch {
      setCopied('failed');
    }
    window.setTimeout(() => setCopied('idle'), 2400);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 border-t-[0.5px] border-white/10 bg-band text-band-fg">
      <div className="page-container pt-20 pb-14 md:pt-28 md:pb-16">
        <Reveal>
          <p className="eyebrow text-band-muted">04 · Contact</p>
          <h2 id="contact-title" className="mt-4 font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.98] tracking-[0.01em]">
            Let’s build something<br className="hidden sm:block" />{' '}<span className="text-band-muted">worth remembering.</span>
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleHireMeClick}
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-band-fg px-7 py-4 text-[15px] font-medium text-band transition-colors duration-300 hover:bg-white"
          >
            Start a project
            <span aria-hidden="true" className="transition-transform duration-500 ease-out-soft group-hover:translate-x-1">→</span>
          </button>
          <button
            type="button"
            onClick={copy}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-6 py-4 text-[15px] text-band-fg transition-colors duration-300 hover:border-white"
          >
            {copied === 'copied' ? 'Email copied ✓' : copied === 'failed' ? 'Copy failed, select below' : 'Copy email'}
          </button>
          <span role="status" aria-live="polite" className="sr-only">{copied === 'copied' ? 'Email address copied.' : ''}</span>
        </Reveal>

        <Reveal delay={160} className="mt-16 grid grid-cols-1 border-t-[0.5px] border-white/15 md:grid-cols-3">
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center justify-between gap-4 border-b-[0.5px] border-white/15 py-6 no-underline md:border-b-0 md:border-r-[0.5px] md:pr-8"
          >
            <span>
              <span className="eyebrow block text-band-muted">Email</span>
              <span className="mt-2 block select-text break-all text-[15px] text-band-fg transition-colors group-hover:text-band-fg">{EMAIL}</span>
            </span>
            <span aria-hidden="true" className="text-band-faint transition-all duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-band-fg">↗</span>
          </a>
          {socials.map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between gap-4 border-b-[0.5px] border-white/15 py-6 no-underline md:border-b-0 md:px-8 ${index === 0 ? 'md:border-r-[0.5px]' : ''}`}
            >
              <span>
                <span className="eyebrow block text-band-muted">{social.label}</span>
                <span className="mt-2 block text-[15px] text-band-fg transition-colors group-hover:text-band-fg">{social.handle}</span>
              </span>
              <span aria-hidden="true" className="text-band-faint transition-all duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-band-fg">↗</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
