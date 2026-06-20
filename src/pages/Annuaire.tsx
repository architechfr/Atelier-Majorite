import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, Avatar, EmptyState } from "../components/ui";
import { useElus } from "../lib/store";

export default function Annuaire() {
  const elus = useElus();
  const [q, setQ] = useState("");

  const liste = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return elus;
    return elus.filter((e) =>
      `${e.prenom} ${e.nom} ${e.fonction} ${e.delegation ?? ""}`
        .toLowerCase()
        .includes(t),
    );
  }, [elus, q]);

  return (
    <div>
      <div className="mb-[18px] flex max-w-[380px] items-center gap-2.5 rounded-xl border border-line bg-panel px-3.5 py-2.5">
        <Search size={16} className="text-ink-soft" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher par nom ou délégation…"
          className="w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-soft"
        />
      </div>

      {liste.length === 0 ? (
        <EmptyState
          icon={<Search size={32} />}
          title="Aucun élu trouvé"
          hint="Essayez un autre nom ou une autre délégation."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((e) => (
            <Card
              key={e.id}
              className="p-[18px] transition hover:border-marine-200 hover:shadow-[var(--shadow-pop)]"
            >
              <div className="flex items-center gap-3">
                <Avatar
                  ini={`${e.prenom[0]}${e.nom[0]}`}
                  couleur={e.couleur}
                  size={44}
                />
                <div className="min-w-0">
                  <div className="text-sm font-bold leading-tight text-ink">
                    {e.prenom} {e.nom}
                  </div>
                  <div className="mt-0.5 text-[11.5px] font-semibold text-accent">
                    {e.fonction}
                  </div>
                </div>
              </div>
              {e.delegation && (
                <p className="mt-3 text-[12.5px] leading-snug text-ink-muted">
                  {e.delegation}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
