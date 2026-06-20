import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Button, Field, Input } from "../components/ui";

export default function Login() {
  const { session, login, mode } = useAuth();
  const [identity, setIdentity] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Déjà connecté → on bascule dans l'app (gère aussi le retour de Firebase Auth).
  if (session) return <Navigate to="/" replace />;

  const isFirebase = mode === "firebase";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const err = await login(identity, secret);
    setSubmitting(false);
    if (err) setError(err);
  };

  return (
    <div
      className="flex min-h-full items-center justify-center px-4 py-10"
      style={{
        background:
          "radial-gradient(1200px 600px at 80% -10%, #234974 0%, transparent 60%), #102740",
      }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="font-display grid h-12 w-12 place-items-center rounded-[14px] text-lg font-bold text-white"
              style={{
                background: "linear-gradient(140deg,#2F6BFF,#5FA8FF)",
                boxShadow: "0 8px 20px -8px rgba(47,107,255,.6)",
              }}
            >
              AM
            </span>
            <div className="text-left">
              <div className="font-display text-xl font-bold leading-none text-white">
                L'Atelier Majorité
              </div>
              <div className="mt-1 text-[10px] tracking-[0.16em] text-royal-300">
                FERRIÈRES-EN-BRIE
              </div>
            </div>
          </div>
          <p className="text-sm text-royal-100/70">
            Cockpit réservé aux élus de la majorité
          </p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl bg-white p-6 shadow-2xl"
        >
          {isFirebase ? (
            <>
              <Field label="Adresse e-mail">
                <Input
                  type="email"
                  value={identity}
                  onChange={(e) => {
                    setIdentity(e.target.value);
                    setError("");
                  }}
                  placeholder="prenom.nom@ferrieres.fr"
                  autoComplete="email"
                  required
                />
              </Field>
              <Field label="Mot de passe">
                <Input
                  type="password"
                  value={secret}
                  onChange={(e) => {
                    setSecret(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </Field>
            </>
          ) : (
            <>
              <Field label="Votre nom">
                <Input
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  placeholder="Prénom Nom"
                  autoComplete="name"
                />
              </Field>
              <Field label="Code d'accès">
                <Input
                  type="password"
                  value={secret}
                  onChange={(e) => {
                    setSecret(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                />
              </Field>
            </>
          )}

          {error && (
            <p className="rounded-lg bg-passion-50 px-3 py-2 text-sm font-medium text-passion-700">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="accent"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? "Connexion…" : "Entrer dans l'Atelier"}
          </Button>

          {!isFirebase && (
            <p className="text-center text-xs text-slate-400">
              Démo — code&nbsp;: <span className="font-mono">ferrieres2026</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
