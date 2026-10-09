import { cn } from "@/lib/utils";

export function Chip({ children, color, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[12px] font-medium text-slate-300",
        className,
      )}
      style={color ? { borderColor: `${color}45` } : undefined}
    >
      {children}
    </span>
  );
}

export function SectionTitle({ icon: Icon, children, color }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-slate-400">
      {Icon && <Icon className="h-4 w-4" style={{ color }} aria-hidden="true" />}
      {children}
    </h3>
  );
}

export function FocusBlock({ id, focused, color, children, className }) {
  return (
    <section
      id={`section-${id}`}
      className={cn(
        "scroll-mt-4 rounded-xl border border-transparent p-4 transition-[border-color,background-color] duration-500",
        focused && "bg-white/[0.035]",
        className,
      )}
      style={focused ? { borderColor: `${color}60` } : undefined}
    >
      {children}
    </section>
  );
}

export function ExternalButton({ href, children, icon: Icon, color = "#7ea6ff", variant = "ghost", className }) {
  const primary = variant === "primary";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        primary ? "text-slate-950" : "text-slate-100 hover:bg-white/[0.06]",
        className,
      )}
      style={
        primary
          ? { background: color, borderColor: color }
          : { borderColor: "rgb(148 163 184 / 0.28)" }
      }
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </a>
  );
}
