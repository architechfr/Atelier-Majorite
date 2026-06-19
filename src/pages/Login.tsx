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
    <div className="flex min-h-full items-center justify-center bg-marine-800 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <img
            src="/Atelier-logo.png"
            alt="L'Atelier Majorité"
            className="mx-auto mb-4 w-40 rounded-3xl shadow-2xl"
          />
          <p className="text-sm text-marine-200">
            Espace réservé aux élus de la majorité
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
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
          <p className="text-center text-xs text-slate-400">
            Démo — code&nbsp;: <span className="font-mono">ferrieres2026</span>
          </p>
        </form>
      </div>
    </div>
  );
}
