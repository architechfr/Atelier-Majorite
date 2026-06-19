import {
  useEffect,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-sm ring-1 ring-marine-900/5 ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "soft";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: BtnProps) {
  const styles: Record<string, string> = {
    primary:
      "bg-marine-700 text-white hover:bg-marine-800 shadow-sm shadow-marine-900/20",
    soft: "bg-marine-50 text-marine-700 hover:bg-marine-100",
    ghost: "text-marine-700 hover:bg-marine-50",
    danger: "bg-passion-600 text-white hover:bg-passion-700",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-marine-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur">
          <h2 className="text-lg font-bold text-marine-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
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
      <span className="mb-1.5 block text-sm font-semibold text-marine-800">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-marine-900 outline-none transition focus:border-marine-400 focus:ring-2 focus:ring-marine-100";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ""}`} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
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
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 px-6 py-12 text-center">
      <div className="mb-3 text-slate-300">{icon}</div>
      <p className="font-semibold text-marine-800">{title}</p>
      {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
    </div>
  );
}

export function Avatar({
  prenom,
  nom,
  couleur,
  size = 40,
}: {
  prenom: string;
  nom: string;
  couleur: string;
  size?: number;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{ background: couleur, width: size, height: size, fontSize: size * 0.36 }}
    >
      {prenom[0]}
      {nom[0]}
    </span>
  );
}
