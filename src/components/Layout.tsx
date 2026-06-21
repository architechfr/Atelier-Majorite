import { useEffect, useState, type ComponentType } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  LayoutGrid,
  FolderKanban,
  BarChart3,
  Layers,
  Rss,
  MessageSquare,
  Lightbulb,
  CalendarDays,
  FileText,
  Users,
  Settings,
  Search,
  Plus,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../lib/auth";
import { ELUS } from "../lib/seed";
import { PublishModal } from "./PublishModal";
import { SearchModal } from "./SearchModal";

type IconType = ComponentType<{ size?: number; className?: string }>;

interface NavItem {
  to: string;
  label: string;
  icon: IconType;
  end?: boolean;
  badge?: number;
}

const GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "PILOTAGE",
    items: [
      { to: "/", label: "Tableau de bord", icon: LayoutGrid, end: true },
      { to: "/projets", label: "Projets & délégations", icon: FolderKanban },
      { to: "/indicateurs", label: "Indicateurs", icon: BarChart3 },
    ],
  },
  {
    title: "TERRITOIRE",
    items: [{ to: "/territoire", label: "Mon territoire", icon: Layers }],
  },
  {
    title: "ÉCHANGER",
    items: [
      { to: "/fil", label: "Fil de la majorité", icon: Rss },
      { to: "/messages", label: "Messagerie", icon: MessageSquare, badge: 0 },
      { to: "/idees", label: "Boîte à idées", icon: Lightbulb },
    ],
  },
  {
    title: "RESSOURCES",
    items: [
      { to: "/agenda", label: "Agenda & conseils", icon: CalendarDays },
      { to: "/documents", label: "Documents", icon: FileText },
      { to: "/annuaire", label: "Annuaire", icon: Users },
    ],
  },
  {
    title: "PERSONNEL",
    items: [{ to: "/reglages", label: "Réglages", icon: Settings }],
  },
];

export const PAGE_TITLES: Record<string, string> = {
  "/": "Tableau de bord",
  "/projets": "Projets & délégations",
  "/indicateurs": "Indicateurs de la commune",
  "/territoire": "Mon territoire",
  "/fil": "Fil de la majorité",
  "/messages": "Messagerie",
  "/idees": "Boîte à idées",
  "/agenda": "Agenda & conseils",
  "/documents": "Documents & délibérations",
  "/annuaire": "Annuaire des élus",
  "/reglages": "Réglages",
};

const MOBILE_TABS: NavItem[] = [
  { to: "/", label: "Cockpit", icon: LayoutGrid, end: true },
  { to: "/fil", label: "Fil", icon: Rss },
  { to: "/messages", label: "Messages", icon: MessageSquare, badge: 0 },
  { to: "/agenda", label: "Agenda", icon: CalendarDays },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "AM";
}

function roleFor(name: string) {
  const n = name.trim().toLowerCase();
  const elu = ELUS.find(
    (e) => `${e.prenom} ${e.nom}`.toLowerCase() === n,
  );
  return elu?.delegation ?? "Élu·e de la majorité";
}

function todayLabel() {
  const s = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function Layout() {
  const { session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const name = session?.name ?? "Élu·e";
  const title = PAGE_TITLES[location.pathname] ?? "L'Atelier Majorité";

  // Raccourci clavier Ctrl+K / Cmd+K pour la recherche
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Événement global pour ouvrir la modale depuis n'importe quelle page
  useEffect(() => {
    const handler = () => setPublishOpen(true);
    document.addEventListener("open-publish", handler);
    return () => document.removeEventListener("open-publish", handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-app text-ink">
      {/* ===== Sidebar desktop ===== */}
      <aside
        className="hidden w-[252px] shrink-0 flex-col px-4 py-[18px] lg:flex"
        style={{ background: "var(--c-sidebar)" }}
      >
        <Brand />
        <nav className="no-scrollbar mt-1 flex-1 overflow-y-auto pt-1">
          <NavGroups onNavigate={() => {}} />
        </nav>
        <UserCard name={name} />
      </aside>

      {/* ===== Colonne principale ===== */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header
          className="sticky top-0 z-20 flex h-[68px] shrink-0 items-center gap-4 border-b border-line px-4 backdrop-blur md:px-6"
          style={{ background: "var(--c-topbar)" }}
        >
          <button
            onClick={() => setDrawer(true)}
            className="rounded-xl border border-line bg-panel-2 p-2 text-ink-muted lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <h1 className="font-display truncate text-[19px] font-bold leading-tight text-ink">
              {title}
            </h1>
            <p className="mt-0.5 text-[11.5px] text-ink-soft">{todayLabel()}</p>
          </div>

          {/* Barre de recherche — fonctionnelle */}
          <div className="hidden flex-1 justify-center md:flex">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-[340px] max-w-full items-center gap-2.5 rounded-xl border border-line bg-panel-2 px-3.5 py-2.5 text-[13px] text-ink-soft transition hover:border-royal-300 hover:bg-panel"
            >
              <Search size={16} />
              <span className="flex-1 truncate text-left">
                Rechercher un élu, une délibération…
              </span>
              <kbd className="hidden rounded border border-line px-1 py-0.5 font-mono text-[10px] xl:block">
                Ctrl K
              </kbd>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2.5 md:ml-0">
            {/* Bouton Publier — ouvre la modale de publication */}
            <button
              onClick={() => setPublishOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[13.5px] font-semibold text-[var(--c-btn-ink)] shadow-[0_8px_18px_-8px_rgba(22,50,79,.55)]"
              style={{ background: "var(--c-btn)" }}
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Publier</span>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="grid h-[42px] w-[42px] place-items-center rounded-xl border border-line bg-panel-2 text-ink-muted transition hover:text-ink md:hidden"
              aria-label="Rechercher"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => navigate("/messages")}
              className="grid h-[42px] w-[42px] place-items-center rounded-xl border border-line bg-panel-2 text-ink-muted transition hover:text-ink"
              aria-label="Messagerie"
            >
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* Zone scrollable */}
        <main className="flex-1 overflow-y-auto px-4 pb-24 pt-6 md:px-7 md:pb-10">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ===== Drawer mobile ===== */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-marine-900/50 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
          />
          <div
            className="absolute inset-y-0 left-0 flex w-[270px] flex-col px-4 py-[18px] shadow-2xl"
            style={{ background: "var(--c-sidebar)" }}
          >
            <div className="flex items-center justify-between">
              <Brand />
              <button
                onClick={() => setDrawer(false)}
                className="rounded-lg p-1.5 text-white/70 hover:bg-white/10"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="no-scrollbar mt-2 flex-1 overflow-y-auto">
              <NavGroups onNavigate={() => setDrawer(false)} />
            </nav>
            <UserCard name={name} />
          </div>
        </div>
      )}

      {/* ===== Bottom nav mobile ===== */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-line pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
        style={{ background: "var(--c-topbar)" }}
      >
        {MOBILE_TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              `relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[9.5px] font-semibold ${
                isActive ? "text-accent" : "text-ink-soft"
              }`
            }
          >
            <span className="relative">
              <t.icon size={22} />
              {!!t.badge && (
                <span className="absolute -right-2 -top-1 h-1.5 w-1.5 rounded-full bg-passion-500" />
              )}
            </span>
            {t.label}
          </NavLink>
        ))}
      </nav>

      {/* ===== Modaux globaux ===== */}
      <PublishModal open={publishOpen} onClose={() => setPublishOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-1.5 pb-[18px] pt-1">
      <span
        className="font-display grid h-[38px] w-[38px] place-items-center rounded-[11px] text-base font-bold text-white"
        style={{
          background: "linear-gradient(140deg,#2F6BFF,#5FA8FF)",
          boxShadow: "0 6px 16px -6px rgba(47,107,255,.7)",
        }}
      >
        AM
      </span>
      <div>
        <div className="font-display text-[15.5px] font-bold leading-none text-white">
          Atelier Majorité
        </div>
        <div
          className="mt-1 text-[10px] tracking-[0.16em]"
          style={{ color: "var(--c-sidebar-ink)" }}
        >
          FERRIÈRES-EN-BRIE
        </div>
      </div>
    </div>
  );
}

function NavGroups({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-0.5">
      {GROUPS.map((g) => (
        <div key={g.title}>
          <div
            className="px-2 pb-1.5 pt-4 text-[10px] font-bold tracking-[0.15em]"
            style={{ color: "var(--c-sidebar-section)" }}
          >
            {g.title}
          </div>
          {g.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `relative flex items-center gap-3 rounded-[11px] px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "font-semibold text-white"
                    : "font-medium hover:bg-white/10 hover:text-white"
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? "rgba(255,255,255,0.14)" : "transparent",
                color: isActive ? "#fff" : "var(--c-sidebar-ink)",
              })}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute -left-2 bottom-2 top-2 w-[3px] rounded-full"
                      style={{ background: "#7FB0FF" }}
                    />
                  )}
                  <item.icon size={19} />
                  <span className="flex-1">{item.label}</span>
                  {!!item.badge && (
                    <span
                      className="rounded-full px-1.5 text-[11px] font-bold text-white"
                      style={{ background: "#2F6BFF" }}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
}

function UserCard({ name }: { name: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/reglages")}
      className="mt-2 flex items-center gap-2.5 border-t pt-3 text-left"
      style={{ borderColor: "var(--c-sidebar-border)" }}
    >
      <span
        className="grid h-[34px] w-[34px] place-items-center rounded-[10px] text-[13px] font-bold text-white"
        style={{ background: "#2F6BFF" }}
      >
        {initials(name)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold leading-tight text-white">
          {name}
        </span>
        <span
          className="block truncate text-[11px]"
          style={{ color: "var(--c-sidebar-ink)" }}
        >
          {roleFor(name)}
        </span>
      </span>
      <Settings size={17} style={{ color: "var(--c-sidebar-ink)" }} />
    </button>
  );
}
