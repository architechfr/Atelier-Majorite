import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { PageHeader } from "../components/Layout";
import { Avatar, Card } from "../components/ui";
import { useElus } from "../lib/store";

export default function Elus() {
  const elus = useElus();
  const avecPermanence = elus.filter((e) => e.permanence);

  return (
    <>
      <PageHeader
        title="Élus & contacts"
        subtitle="Trombinoscope de la majorité et permanences."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {elus.map((e) => (
          <Card key={e.id} className="p-5">
            <div className="flex items-center gap-4">
              <Avatar prenom={e.prenom} nom={e.nom} couleur={e.couleur} size={52} />
              <div className="min-w-0">
                <h3 className="font-bold text-marine-900">
                  {e.prenom} {e.nom}
                </h3>
                <p className="text-sm font-semibold text-passion-600">
                  {e.fonction}
                </p>
                {e.delegation && (
                  <p className="text-xs text-slate-500">{e.delegation}</p>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
              <a
                href={`mailto:${e.email}`}
                className="flex items-center gap-2 text-slate-600 hover:text-marine-700"
              >
                <Mail size={15} className="text-marine-400" /> {e.email}
              </a>
              {e.telephone && (
                <a
                  href={`tel:${e.telephone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-marine-700"
                >
                  <Phone size={15} className="text-marine-400" /> {e.telephone}
                </a>
              )}
              {e.permanence && (
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-marine-50 px-3 py-2 text-xs text-marine-700">
                  <Clock size={14} />
                  <span className="font-semibold">
                    {e.permanence.jour} {e.permanence.heure}
                  </span>
                  <MapPin size={14} /> {e.permanence.lieu}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {avecPermanence.length > 0 && (
        <Card className="mt-6 p-5">
          <h2 className="mb-3 font-bold text-marine-900">
            Récapitulatif des permanences
          </h2>
          <div className="divide-y divide-slate-100">
            {avecPermanence.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
              >
                <span className="font-semibold text-marine-800">
                  {e.prenom} {e.nom}
                </span>
                <span className="text-slate-500">
                  {e.permanence!.jour} · {e.permanence!.heure} ·{" "}
                  {e.permanence!.lieu}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
