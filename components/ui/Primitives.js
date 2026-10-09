import { cn } from "@/lib/utils";

export function Chip({ children, color, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-300",
        className,
      )}
      style={color ? { borderColor: `${color}55`, boxShadow: `0 0 14px -6px ${color}` } : undefined}
    >
      {children}
    </span>
  );
}

export function SectionTitle({ icon: Icon, children, color }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400">
      {Icon && <Icon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />}
      {children}
    </h3>
  );
}

export function FocusBlock({ id, focused, color, children, className }) {
  return (
    <section
      id={`section-${id}`}
      className={cn(
        "scroll-mt-4 rounded-2xl border border-transparent p-4 transition-[border-color,background-color,box-shadow] duration-500",
        focused && "bg-white/[0.03]",
        className,
      )}
      style={focused ? { borderColor: `${color}66`, boxShadow: `0 0 32px -16px ${color}` } : undefined}
    >
      {children}
    </section>
  );
}

export function ExternalButton({ href, children, icon: Icon, color = "#22d3ee", className }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2",
        className,
      )}
      style={{
        borderColor: `${color}66`,
        background: `linear-gradient(135deg, ${color}26, transparent)`,
        boxShadow: `0 0 24px -10px ${color}`,
      }}
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </a>
  );
}
