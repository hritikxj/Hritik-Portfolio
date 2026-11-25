import { summaries } from '@/content/summaries';

/**
 * The project at a glance: brief, role, what was made and the outcome, readable in
 * a few seconds. It sits under the opening visual, so a project opens on the work, not on text. Uses only site tokens, so it reads the same on
 * every case study in light and dark.
 */
export default function ProjectSummary({ link, className = '' }: { link: string; className?: string }) {
  const summary = summaries[link];
  if (!summary) return null;

  const items = [
    { label: 'Brief', text: summary.brief },
    { label: 'My role', text: summary.role },
    { label: 'What I made', text: summary.made },
    { label: summary.last.label, text: summary.last.text },
  ];

  return (
    <section aria-label="Project at a glance" className={`w-full font-body ${className}`}>
      <dl className="grid gap-x-8 gap-y-5 border-y-[0.5px] border-border-subtle py-6 sm:grid-cols-2 md:py-7 lg:grid-cols-4">
        {items.map(item => (
          <div key={item.label} className="min-w-0">
            <dt className="eyebrow text-[11px] text-smoke">{item.label}</dt>
            <dd className="mt-2 text-[15px] leading-[1.55] text-ink">{item.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
