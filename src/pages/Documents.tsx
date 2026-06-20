import { useState } from "react";
import {
  ChevronDown,
  FileText,
  CheckCircle2,
  Video,
  Lock,
} from "lucide-react";
import { Card } from "../components/ui";
import { CONSEILS, RUBRIQUE_COLOR, type Conseil } from "../lib/conseils";

const MOIS = [
  "JANV", "FÉVR", "MARS", "AVR", "MAI", "JUIN",
  "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC",
];

export default function Documents() {
  // La séance la plus récente est dépliée par défaut.
  const [open, setOpen] = useState<string | null>(CONSEILS[0]?.id ?? null);

  return (
    <div className="max-w-[860px]">
      <p className="mb-[18px] text-[13px] leading-relaxed text-ink-muted">
        Archive des conseils municipaux 2026 — ordre du jour et délibérations
        transmis aux élus.{" "}
        <span className="font-semibold text-ink">
          Les documents (convocation, dossier, procès-verbal) seront consultables
          ici une fois l'accès sécurisé.
        </span>
      </p>

      <div className="flex flex-col gap-3.5">
        {CONSEILS.map((c) => (
          <ConseilCard
            key={c.id}
            conseil={c}
            open={open === c.id}
            onToggle={() => setOpen((v) => (v === c.id ? null : c.id))}
          />
        ))}
      </div>
    </div>
  );
}

function ConseilCard({
  conseil: c,
  open,
  onToggle,
}: {
  conseil: Conseil;
  open: boolean;
  onToggle: () => void;
}) {
  const d = new Date(c.date);
  const jour = String(d.getDate()).padStart(2, "0");
  const mois = MOIS[d.getMonth()];

  // Regroupe les délibérations par rubrique, dans l'ordre d'apparition.
  const groupes: { rubrique: string; items: typeof c.delibs }[] = [];
  for (const del of c.delibs) {
    let g = groupes.find((x) => x.rubrique === del.rubrique);
    if (!g) {
      g = { rubrique: del.rubrique, items: [] };
      groupes.push(g);
    }
    g.items.push(del);
  }

  return (
    <Card className="overflow-hidden p-0">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <div className="w-[58px] shrink-0 text-center">
          <div className="font-display text-[26px] font-bold leading-none text-accent">
            {jour}
          </div>
          <div className="mt-1 text-[11px] font-bold tracking-wider text-ink-soft">
            {mois}
          </div>
        </div>
        <div className="w-px self-stretch bg-line-soft" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-base font-semibold text-ink">
              Conseil municipal
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-panel-2 px-2 py-0.5 text-[11px] font-bold text-ink-muted">
              {c.delibs.length} délibération{c.delibs.length > 1 ? "s" : ""}
            </span>
            {c.diffuse && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink-soft">
                <Video size={13} /> Séance filmée
              </span>
            )}
          </div>
          <div className="mt-1 text-[12.5px] text-ink-muted">
            {c.dateLabel} · {c.heure}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[12px] font-semibold text-success">
            <CheckCircle2 size={13} /> {c.pvStatut}
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 text-ink-soft transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-line-soft px-5 py-5">
          <div className="text-[11px] font-bold tracking-[0.06em] text-ink-soft">
            ORDRE DU JOUR
          </div>
          <ul className="mt-2 space-y-1 text-[13px] italic text-ink-muted">
            {c.prelim.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className="mt-4 space-y-4">
            {groupes.map((g) => (
              <div key={g.rubrique}>
                <div
                  className="mb-2 text-[11px] font-bold tracking-[0.08em]"
                  style={{ color: RUBRIQUE_COLOR[g.rubrique] ?? "var(--c-ink)" }}
                >
                  {g.rubrique}
                </div>
                <div className="flex flex-col gap-1.5">
                  {g.items.map((del) => (
                    <div key={del.num} className="flex gap-2.5">
                      <span
                        className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-md text-[11px] font-bold text-white"
                        style={{
                          background: RUBRIQUE_COLOR[g.rubrique] ?? "#16324F",
                        }}
                      >
                        {del.num}
                      </span>
                      <span className="text-[13.5px] leading-snug text-ink">
                        {del.intitule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {c.questionsDiverses && (
            <div className="mt-4 text-[13px] font-semibold text-ink-muted">
              Questions diverses
            </div>
          )}

          {/* Pièces du dossier — verrouillées tant que l'accès n'est pas sécurisé */}
          <div className="mt-5 border-t border-line-soft pt-4">
            <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.06em] text-ink-soft">
              <Lock size={12} /> PIÈCES DU DOSSIER ({c.fichiers.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {c.fichiers.map((f) => (
                <span
                  key={f.nom}
                  title="Disponible après sécurisation de l'accès"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-panel-2 px-2.5 py-1.5 text-[12px] font-medium text-ink-muted"
                >
                  <FileText size={13} className="text-ink-soft" />
                  {f.nom}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
