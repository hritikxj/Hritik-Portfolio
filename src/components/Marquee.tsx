export default function Marquee() {
  const baseItems = [
    "Brand Identity", "Graphic Design", "Illustration", "UI/UX Design", "Editorial", "Visual Systems", "Motion"
  ];
  const items = [...baseItems, ...baseItems];

  return (
    <div className="overflow-hidden border-b-[0.5px] border-border-subtle py-3.5 bg-ink flex w-full">
      <div className="flex shrink-0 gap-0 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
        {items.map((item, i) => (
          <span key={`1-${i}`} className="text-[11px] tracking-[0.12em] uppercase text-white/50 px-8 flex items-center">
            {item}<span className="text-brand-red px-2">·</span>
          </span>
        ))}
      </div>
      <div className="flex shrink-0 gap-0 whitespace-nowrap animate-[marquee_25s_linear_infinite]" aria-hidden="true">
        {items.map((item, i) => (
          <span key={`2-${i}`} className="text-[11px] tracking-[0.12em] uppercase text-white/50 px-8 flex items-center">
            {item}<span className="text-brand-red px-2">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
