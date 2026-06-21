import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/ui";
import { ELUS, type Elu } from "../lib/seed";

const SECTIONS = [
  {
    title: "DIRECTION",
    elus: ELUS.filter((e) => e.fonction === "Maire"),
  },
  {
    title: "ADJOINTS AU MAIRE",
    elus: ELUS.filter((e) => e.fonction.toLowerCase().includes("adjoint")),
  },
  {
    title: "CONSEILLERS DÉLÉGUÉS",
    elus: ELUS.filter((e) => e.fonction.toLowerCase().includes("conseiller")),
  },
];

export default function Projets() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[860px] space-y-6">
      <p className="text-[13px] leading-relaxed text-ink-muted">
        Délégations municipales attribuées pour la mandature 2026 — Ferrières-en-Brie.
      </p>

      {SECTIONS.map((s) => (
        <div key={s.title}>
          <div className="mb-3 text-[10.5px] font-bold tracking-[0.15em] text-ink-soft">
            {s.title}
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {s.elus.map((e) => (
              <EluCard key={e.id} elu={e} onNavigate={() => navigate("/annuaire")} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EluCard({ elu: e, onNavigate }: { elu: Elu; onNavigate: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onNavigate}
      onKeyDown={(ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          onNavigate();
        }
      }}
      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-panel p-4 shadow-[var(--shadow-card)] transition hover:border-marine-200 hover:shadow-[var(--shadow-pop)]"
    >
      <Avatar ini={`${e.prenom[0]}${e.nom[0]}`} couleur={e.couleur} size={40} />
      <div className="min-w-0">
        <div className="text-[13.5px] font-bold text-ink">
          {e.prenom} {e.nom}
        </div>
        <div className="mt-0.5 text-[11.5px] font-semibold text-accent">
          {e.fonction}
        </div>
        {e.delegation && (
          <div className="mt-1 text-[12px] leading-snug text-ink-muted">
            {e.delegation}
          </div>
        )}
      </div>
    </div>
  );
}
