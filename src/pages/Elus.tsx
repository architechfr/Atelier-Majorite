import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { PageHeader } from "../components/Layout";
import { Avatar, Card } from "../components/ui";
import { useElus } from "../lib/store";
import type { Elu } from "../lib/types";

export default function Elus() {
  const elus = useElus();

  const maire = elus.filter((e) => e.fonction === "Maire");
  const adjoints = elus.filter((e) => e.fonction.includes("Adjoint"));
  const conseillers = elus.filter(
    (e) => e.fonction !== "Maire" && !e.fonction.includes("Adjoint"),
  );

  return (
    <>
      <PageHeader
        title="Élus & contacts"
        subtitle="L'équipe de la majorité municipale et ses délégations."
      />

      <Groupe titre="Maire" elus={maire} />
      <Groupe titre="Maires-Adjoints" elus={adjoints} />
      <Groupe titre="Conseillers municipaux" elus={conseillers} />
    </>
  );
}

function Groupe({ titre, elus }: { titre: string; elus: Elu[] }) {
  if (elus.length === 0) return null;
  return (
    <section className="mb-8">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-marine-500">
        {titre}
        <span className="rounded-full bg-marine-50 px-2 py-0.5 text-xs text-marine-600">
          {elus.length}
        </span>
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {elus.map((e) => (
          <EluCard key={e.id} elu={e} />
        ))}
      </div>
    </section>
  );
}

function EluCard({ elu: e }: { elu: Elu }) {
  const hasContact = e.email || e.telephone || e.permanence;
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <Avatar prenom={e.prenom} nom={e.nom} couleur={e.couleur} size={52} />
        <div className="min-w-0">
          <h3 className="font-bold text-marine-900">
            {e.prenom} {e.nom}
          </h3>
          <p className="text-sm font-semibold text-atelier-600">{e.fonction}</p>
          {e.delegation && (
            <p className="text-xs text-slate-500">{e.delegation}</p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
        {e.email && (
          <a
            href={`mailto:${e.email}`}
            className="flex items-center gap-2 text-slate-600 hover:text-marine-700"
          >
            <Mail size={15} className="text-marine-400" /> {e.email}
          </a>
        )}
        {e.telephone && (
          <a
            href={`tel:${e.telephone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-slate-600 hover:text-marine-700"
          >
            <Phone size={15} className="text-marine-400" /> {e.telephone}
          </a>
        )}
        {e.permanence && (
          <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-marine-50 px-3 py-2 text-xs text-marine-700">
            <Clock size={14} />
            <span className="font-semibold">
              {e.permanence.jour} {e.permanence.heure}
            </span>
            <MapPin size={14} /> {e.permanence.lieu}
          </div>
        )}
        {!hasContact && (
          <p className="text-xs italic text-slate-400">
            Coordonnées à compléter
          </p>
        )}
      </div>
    </Card>
  );
}
