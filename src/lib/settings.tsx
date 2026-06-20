import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Préférences d'ambiance et d'accessibilité de l'Atelier.
// Persistées en local — prêtes à être stockées par élu côté Supabase.

export type Theme = "clair" | "nocturne";
export type Scale = "standard" | "grand" | "xl";

export interface NotifPrefs {
  conseils: boolean;
  mentions: boolean;
  idees: boolean;
}

export interface Settings {
  theme: Theme;
  scale: Scale;
  highContrast: boolean;
  reduceMotion: boolean;
  notif: NotifPrefs;
}

const DEFAULTS: Settings = {
  theme: "clair",
  scale: "standard",
  highContrast: false,
  reduceMotion: false,
  notif: { conseils: true, mentions: true, idees: false },
};

const KEY = "am-settings-v1";
const SCALE_VALUE: Record<Scale, number> = {
  standard: 1,
  grand: 1.07,
  xl: 1.16,
};

interface Ctx {
  settings: Settings;
  setTheme: (t: Theme) => void;
  setScale: (s: Scale) => void;
  toggle: (k: "highContrast" | "reduceMotion") => void;
  toggleNotif: (k: keyof NotifPrefs) => void;
}

const SettingsCtx = createContext<Ctx | null>(null);

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULTS;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(settings));
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.contrast = settings.highContrast ? "high" : "normal";
    root.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
    root.style.setProperty("--scale", String(SCALE_VALUE[settings.scale]));
    root.style.colorScheme = settings.theme === "nocturne" ? "dark" : "light";
  }, [settings]);

  const value: Ctx = {
    settings,
    setTheme: (theme) => setSettings((s) => ({ ...s, theme })),
    setScale: (scale) => setSettings((s) => ({ ...s, scale })),
    toggle: (k) => setSettings((s) => ({ ...s, [k]: !s[k] })),
    toggleNotif: (k) =>
      setSettings((s) => ({ ...s, notif: { ...s.notif, [k]: !s.notif[k] } })),
  };

  return <SettingsCtx.Provider value={value}>{children}</SettingsCtx.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsCtx);
  if (!ctx) throw new Error("useSettings doit être utilisé dans SettingsProvider");
  return ctx;
}
