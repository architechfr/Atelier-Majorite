import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Button, Field, Input } from "../components/ui";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(code, name)) {
      navigate("/");
    } else {
      setError("Code d'accès incorrect.");
    }
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
          <Field label="Votre nom">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Prénom Nom"
              autoComplete="name"
            />
          </Field>
          <Field label="Code d'accès">
            <Input
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
            />
          </Field>
          {error && (
            <p className="rounded-lg bg-passion-50 px-3 py-2 text-sm font-medium text-passion-700">
              {error}
            </p>
          )}
          <Button type="submit" variant="accent" className="w-full">
            Entrer dans l'Atelier
          </Button>
          <p className="text-center text-xs text-slate-400">
            Démo — code&nbsp;: <span className="font-mono">ferrieres2026</span>
          </p>
        </form>
      </div>
    </div>
  );
}
