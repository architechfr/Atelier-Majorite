import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  MessageSquareWarning,
  Users,
  LogOut,
} from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "../lib/auth";
import { useSignalements } from "../lib/store";
import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/actualites", label: "Actualités", icon: Newspaper },
  { to: "/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/signalements", label: "Signalements", icon: MessageSquareWarning },
  { to: "/elus", label: "Élus & contacts", icon: Users },
];

export default function Layout() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const signalements = useSignalements();
  const nouveaux = signalements.filter((s) => s.statut === "Nouveau").length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-full bg-sand-50">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 flex-col bg-marine-800 px-4 py-6 md:flex">
        <div className="px-2">
          <Logo light />
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-atelier-300">
            Échanger · Coopérer · Agir
          </p>
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <SideLink key={item.to} {...item} badge={item.to === "/signalements" ? nouveaux : 0} />
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-marine-900/40 p-3">
          <p className="px-1 text-xs text-marine-200">Connecté·e</p>
          <p className="px-1 text-sm font-semibold text-white">{session?.name}</p>
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-sm text-marine-100 transition hover:bg-marine-900/60 hover:text-white"
          >
            <LogOut size={16} /> Se déconnecter
          </button>
        </div>
      </aside>

      {/* Colonne principale */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-marine-900/5 bg-white/90 px-4 py-3 backdrop-blur md:hidden">
          <Logo />
          <button
            onClick={handleLogout}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
          >
            <LogOut size={20} />
          </button>
        </header>

        <main className="flex-1 px-4 pb-28 pt-5 md:px-8 md:pb-10 md:pt-8">
          <div className="mx-auto w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Bottom nav mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-marine-900/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {nav.map((item) => (
          <BottomLink key={item.to} {...item} badge={item.to === "/signalements" ? nouveaux : 0} />
        ))}
      </nav>
    </div>
  );
}

function SideLink({
  to,
  label,
  icon: Icon,
  end,
  badge,
}: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
  badge?: number;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
          isActive
            ? "bg-white text-marine-900 shadow-sm"
            : "text-marine-100 hover:bg-marine-900/40 hover:text-white"
        }`
      }
    >
      <Icon size={19} />
      <span className="flex-1">{label}</span>
      {!!badge && (
        <span className="rounded-full bg-passion-500 px-1.5 text-xs font-bold text-white">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

function BottomLink({
  to,
  label,
  icon: Icon,
  end,
  badge,
}: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
  badge?: number;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition ${
          isActive ? "text-marine-700" : "text-slate-400"
        }`
      }
    >
      <span className="relative">
        <Icon size={22} />
        {!!badge && (
          <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-passion-500 px-1 text-[9px] font-bold text-white">
            {badge}
          </span>
        )}
      </span>
      {label.split(" ")[0]}
    </NavLink>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-marine-900 md:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
