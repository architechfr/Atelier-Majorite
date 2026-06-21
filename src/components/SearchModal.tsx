import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Search, Users, X } from "lucide-react";
import { ELUS } from "../lib/seed";
import { CONSEILS } from "../lib/conseils";
import { Avatar } from "./ui";

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  // Fermer avec Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Réinitialise la recherche à chaque ouverture
  useEffect(() => {
    if (open) setQ("");
  }, [open]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return { elus: [], delibs: [] };

    const elus = ELUS.filter((e) =>
      `${e.prenom} ${e.nom} ${e.delegation ?? ""} ${e.fonction}`
        .toLowerCase()
        .includes(t),
    ).slice(0, 5);

    const delibs = CONSEILS.flatMap((c) =>
      c.delibs
        .filter((d) => d.intitule.toLowerCase().includes(t))
        .map((d) => ({ ...d, conseilDate: c.dateLabel })),
    ).slice(0, 5);

    return { elus, delibs };
  }, [q]);

  if (!open) return null;

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  const hasResults = results.elus.length > 0 || results.delibs.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-marine-900/40 px-4 pt-[10vh] backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
        {/* Saisie */}
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3.5">
          <Search size={18} className="shrink-0 text-ink-soft" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un élu, une délibération…"
            className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-soft"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-ink-soft hover:bg-panel-2"
          >
            <X size={18} />
          </button>
        </div>

        {/* Résultats */}
        <div className="max-h-[400px] overflow-y-auto">
          {q.trim().length < 2 && (
            <p className="px-4 py-8 text-center text-sm text-ink-muted">
              Tapez au moins 2 caractères pour rechercher
            </p>
          )}

          {q.trim().length >= 2 && !hasResults && (
            <p className="px-4 py-8 text-center text-sm text-ink-muted">
              Aucun résultat pour «&nbsp;{q.trim()}&nbsp;»
            </p>
          )}

          {results.elus.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-4 pb-1 pt-3 text-[10.5px] font-bold tracking-wider text-ink-soft">
                <Users size={11} />
                ÉLUS
              </div>
              {results.elus.map((e) => (
                <button
                  key={e.id}
                  onClick={() => go("/annuaire")}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-panel-2"
                >
                  <Avatar
                    ini={`${e.prenom[0]}${e.nom[0]}`}
                    couleur={e.couleur}
                    size={32}
                  />
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold text-ink">
                      {e.prenom} {e.nom}
                    </div>
                    <div className="truncate text-[12px] text-ink-muted">
                      {e.delegation}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {results.delibs.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-4 pb-1 pt-3 text-[10.5px] font-bold tracking-wider text-ink-soft">
                <FileText size={11} />
                DÉLIBÉRATIONS
              </div>
              {results.delibs.map((d, i) => (
                <button
                  key={i}
                  onClick={() => go("/documents")}
                  className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition hover:bg-panel-2"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-marine-100 text-[11px] font-bold text-marine-700">
                    {d.num}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] leading-snug text-ink">
                      {d.intitule}
                    </div>
                    <div className="mt-0.5 text-[11px] text-ink-soft">
                      {d.conseilDate}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {hasResults && <div className="h-2" />}
        </div>

        <div className="border-t border-line-soft px-4 py-2 text-[11px] text-ink-soft">
          <kbd className="rounded border border-line px-1 py-0.5 font-mono text-[10px]">
            Échap
          </kbd>{" "}
          pour fermer
        </div>
      </div>
    </div>
  );
}
