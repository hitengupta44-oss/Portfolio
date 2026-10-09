export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-void" role="status">
      <p className="font-serif text-3xl tracking-tight text-white">Hiten Gupta</p>
      <span className="h-px w-24 overflow-hidden bg-white/10">
        <span className="block h-full w-1/2 animate-flow bg-[linear-gradient(90deg,transparent,#7ea6ff,transparent)] [background-size:200%_100%]" />
      </span>
      <span className="sr-only">Loading portfolio</span>
    </div>
  );
}
