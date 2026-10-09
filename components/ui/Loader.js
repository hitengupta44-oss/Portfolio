export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-void" role="status">
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-orbit-pulse" />
        <span className="absolute inset-3 rounded-full border border-fuchsia-400/50 animate-orbit-pulse [animation-delay:0.3s]" />
        <span className="absolute inset-[26px] rounded-full bg-cyan-300 shadow-[0_0_24px_6px_rgba(34,211,238,0.7)]" />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-400">Initialising constellation</p>
    </div>
  );
}
