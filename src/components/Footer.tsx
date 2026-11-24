export default function Footer() {
  return (
    <footer className="bg-band text-band-muted">
      <div className="page-container">
      <div className="flex flex-col items-center justify-between gap-3 border-t-[0.5px] border-white/15 py-7 text-center sm:flex-row sm:text-left">
        <p className="font-display text-[16px] font-semibold text-band-soft">Hritik Jasnani</p>
        <p className="text-[12.5px]">Designed and built by me · © 2026</p>
        <a href="#main-content" className="text-[12.5px] text-band-soft underline-offset-4 transition-colors hover:text-band-fg hover:underline">
          Back to top ↑
        </a>
      </div>
      </div>
    </footer>
  );
}
