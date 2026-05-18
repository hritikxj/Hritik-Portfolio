export default function Footer() {
  return (
    <footer className="bg-ink border-t-[0.5px] border-white/10 py-7 px-[clamp(20px,4vw,40px)] flex flex-col sm:flex-row gap-4 justify-between items-center text-center">
      <div className="font-display text-base text-white/40">Hritik Jasnani</div>
      <div className="text-[11px] text-white/20 tracking-[0.06em]">© 2026 · All rights reserved</div>
      <div className="text-[11px] text-white/30 tracking-[0.06em]">@hritikjasnani</div>
    </footer>
  );
}
