import {
  useEffect,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

export function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-panel shadow-[var(--shadow-card)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/** Pastille de catégorie / statut avec couleurs explicites (indépendantes du thème). */
export function Pill({
  children,
  color,
  bg,
  className = "",
}: {
  children: ReactNode;
  color?: string;
  bg?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${className}`}
      style={{
        color: color ?? "var(--c-accent)",
        background: bg ?? "var(--c-accent-soft)",
      }}
    >
      {children}
    </span>
  );
}

export function Avatar({
  ini,
  couleur,
  size = 40,
  shape = "square",
}: {
  ini: string;
  couleur: string;
  size?: number;
  shape?: "square" | "round";
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center font-bold text-white"
      style={{
        background: couleur,
        width: size,
        height: size,
        fontSize: size * 0.32,
        borderRadius: shape === "round" ? "50%" : size * 0.28,
      }}
    >
      {ini}
    </span>
  );
}

export function ProgressBar({
  value,
  color = "var(--c-accent)",
  track,
  className = "",
}: {
  value: number;
  color?: string;
  track?: string;
  className?: string;
}) {
  return (
    <div
      className={`h-[7px] overflow-hidden rounded-full ${className}`}
      style={{ background: track ?? "var(--c-line-soft)" }}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "soft" | "danger" | "accent";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  style,
  ...props
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50";
  const map: Record<string, string> = {
    primary: "text-[var(--c-btn-ink)] shadow-[0_8px_18px_-8px_rgba(22,50,79,.55)]",
    accent: "text-[var(--c-accent-ink)]",
    soft: "bg-panel-2 text-ink hover:brightness-95",
    ghost: "text-ink-muted hover:bg-panel-2",
    danger: "text-white",
  };
  const inlineByVariant: Record<string, CSSProperties> = {
    primary: { background: "var(--c-btn)" },
    accent: { background: "var(--c-accent)" },
    danger: { background: "#c0392b" },
  };
  return (
    <button
      className={`${base} ${map[variant]} ${className}`}
      style={{ ...inlineByVariant[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}

export function Toggle({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className="relative h-[26px] w-11 shrink-0 rounded-full transition-colors"
      style={{ background: on ? "#1E8E5A" : "#CBD5E4" }}
    >
      <span
        className="absolute top-0.5 h-[22px] w-[22px] rounded-full bg-white shadow transition-[left]"
        style={{ left: on ? 19 : 2 }}
      />
    </button>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-marine-900/40 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-line bg-panel shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-line bg-panel/95 px-5 py-4 backdrop-blur">
          <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-ink-soft hover:bg-panel-2"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}

const inputBase =
  "w-full rounded-xl border border-line bg-panel px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-soft focus:border-royal-400 focus:ring-2 focus:ring-royal-100";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputBase} min-h-24 resize-y ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputBase} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}

export function EmptyState({
  icon,
  title,
  hint,
}: {
  icon: ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line px-6 py-12 text-center">
      <div className="mb-3 text-ink-soft">{icon}</div>
      <p className="font-semibold text-ink">{title}</p>
      {hint && <p className="mt-1 text-sm text-ink-muted">{hint}</p>}
    </div>
  );
}

/** En-tête de carte : titre display + lien « Tout voir » optionnel. */
export function CardHead({
  title,
  action,
  className = "",
}: {
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className="font-display text-base font-bold text-ink">{title}</h2>
      {action}
    </div>
  );
}
