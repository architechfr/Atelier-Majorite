import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Authentification simplifiée pour le prototype (code d'accès partagé +
// identité de l'élu connecté). À remplacer par Supabase Auth ensuite.

const SESSION_KEY = "fp-session";
const ACCESS_CODE = "ferrieres2026"; // code de démonstration

interface Session {
  name: string;
}

interface AuthCtx {
  session: Session | null;
  login: (code: string, name: string) => boolean;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  });

  const login = (code: string, name: string) => {
    if (code.trim().toLowerCase() !== ACCESS_CODE) return false;
    const s = { name: name.trim() || "Élu·e" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    setSession(s);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return <Ctx.Provider value={{ session, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}
