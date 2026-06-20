import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth as fbAuth, firebaseEnabled } from "./firebase";

// Authentification à deux modes :
//  - "firebase" : vrais comptes par élu (e-mail + mot de passe) dès que la config
//    Firebase est présente (cf. src/lib/firebase.ts).
//  - "demo" : repli sur le code d'accès partagé tant que Firebase n'est pas branché,
//    pour que l'app reste utilisable. À retirer une fois Firebase en place.

const SESSION_KEY = "fp-session";
const ACCESS_CODE = "ferrieres2026"; // code de démonstration (mode repli)

export type AuthMode = "firebase" | "demo";

interface Session {
  name: string;
  email?: string;
  uid?: string;
}

interface AuthCtx {
  session: Session | null;
  ready: boolean;
  mode: AuthMode;
  // identity = e-mail (firebase) ou nom (démo) ; secret = mot de passe ou code.
  login: (identity: string, secret: string) => Promise<string | null>;
  logout: () => Promise<void>;
  updateDisplayName: (name: string) => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

function fbErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "Adresse e-mail invalide.";
    case "auth/user-disabled":
      return "Ce compte a été désactivé.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou mot de passe incorrect.";
    case "auth/too-many-requests":
      return "Trop de tentatives. Réessayez dans quelques minutes.";
    case "auth/network-request-failed":
      return "Problème de connexion réseau.";
    default:
      return "Connexion impossible. Réessayez.";
  }
}

function sessionFromUser(u: User): Session {
  return { name: u.displayName || u.email || "Élu·e", email: u.email ?? undefined, uid: u.uid };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const mode: AuthMode = firebaseEnabled ? "firebase" : "demo";

  const [session, setSession] = useState<Session | null>(() => {
    if (mode === "firebase") return null; // déterminé par onAuthStateChanged
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  });
  // En mode démo on est prêt immédiatement ; en Firebase on attend le 1er callback.
  const [ready, setReady] = useState(mode === "demo");

  useEffect(() => {
    if (mode !== "firebase" || !fbAuth) return;
    const unsub = onAuthStateChanged(fbAuth, (u) => {
      setSession(u ? sessionFromUser(u) : null);
      setReady(true);
    });
    return unsub;
  }, [mode]);

  const login: AuthCtx["login"] = async (identity, secret) => {
    if (mode === "firebase" && fbAuth) {
      try {
        await signInWithEmailAndPassword(fbAuth, identity.trim(), secret);
        return null;
      } catch (e) {
        const code =
          typeof e === "object" && e && "code" in e
            ? String((e as { code: unknown }).code)
            : "";
        return fbErrorMessage(code);
      }
    }
    // mode démo : identity = nom, secret = code partagé
    if (secret.trim().toLowerCase() !== ACCESS_CODE) {
      return "Code d'accès incorrect.";
    }
    const s = { name: identity.trim() || "Élu·e" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    setSession(s);
    return null;
  };

  const updateDisplayName: AuthCtx["updateDisplayName"] = async (name) => {
    if (mode === "firebase" && fbAuth?.currentUser) {
      await updateProfile(fbAuth.currentUser, { displayName: name });
      setSession(sessionFromUser(fbAuth.currentUser));
    } else {
      const s = { ...(session ?? { name: "" }), name };
      localStorage.setItem(SESSION_KEY, JSON.stringify(s));
      setSession(s);
    }
  };

  const logout: AuthCtx["logout"] = async () => {
    if (mode === "firebase" && fbAuth) {
      await signOut(fbAuth);
      return;
    }
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return (
    <Ctx.Provider value={{ session, ready, mode, login, logout, updateDisplayName }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}
