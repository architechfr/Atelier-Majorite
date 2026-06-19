import { useMemo, useState } from "react";
import { CalendarDays, Plus, MapPin, Clock, Trash2, Pencil } from "lucide-react";
import { PageHeader } from "../components/Layout";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  Select,
  Textarea,
} from "../components/ui";
import {
  deleteEvenement,
  uid,
  upsertEvenement,
  useEvenements,
} from "../lib/store";
import { eventTypeColor, fmtTime } from "../lib/format";
import type { Evenement, EvenementType } from "../lib/types";

const TYPES: EvenementType[] = [
  "Conseil municipal",
  "Permanence",
  "Commission",
  "Événement",
  "Réunion",
];

// Convertit un ISO en valeur pour <input type="datetime-local">
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
};
const fromLocalInput = (v: string) => new Date(v).toISOString();

export default function Agenda() {
  const evenements = useEvenements();
  const [edit, setEdit] = useState<Evenement | null>(null);
  const [open, setOpen] = useState(false);
  const [showPast, setShowPast] = useState(false);

  const now = Date.now();
  const groupes = useMemo(() => {
    const liste = [...evenements]
      .filter((e) =>
        showPast ? true : new Date(e.debut).getTime() >= now - 36e5,
      )
      .sort((a, b) => +new Date(a.debut) - +new Date(b.debut));

    const map = new Map<string, Evenement[]>();
    for (const e of liste) {
      const key = new Date(e.debut).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    return [...map.entries()];
  }, [evenements, showPast, now]);

  const nouveau = () => {
    const start = new Date();
    start.setHours(start.getHours() + 1, 0, 0, 0);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);
    setEdit({
      id: uid(),
      titre: "",
      type: "Réunion",
      debut: start.toISOString(),
      fin: end.toISOString(),
      lieu: "",
      description: "",
    });
    setOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Agenda"
        subtitle="Conseils, permanences, commissions et événements."
        action={
          <Button onClick={nouveau} className="shrink-0">
            <Plus size={18} /> <span className="hidden sm:inline">Ajouter</span>
          </Button>
        }
      />

      <div className="mb-5 flex gap-2">
        <button
          onClick={() => setShowPast(false)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            !showPast ? "bg-marine-700 text-white" : "bg-white text-marine-600 ring-1 ring-marine-900/5"
          }`}
        >
          À venir
        </button>
        <button
          onClick={() => setShowPast(true)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            showPast ? "bg-marine-700 text-white" : "bg-white text-marine-600 ring-1 ring-marine-900/5"
          }`}
        >
          Tout l'agenda
        </button>
      </div>

      {groupes.length === 0 ? (
        <EmptyState
          icon={<CalendarDays size={40} />}
          title="Aucun événement à venir"
          hint="Planifiez un conseil, une permanence ou une réunion."
        />
      ) : (
        <div className="space-y-6">
          {groupes.map(([jour, evts]) => (
            <div key={jour}>
              <h2 className="mb-2 text-sm font-bold capitalize text-marine-500">
                {jour}
              </h2>
              <div className="space-y-2.5">
                {evts.map((e) => (
                  <Card key={e.id} className="flex items-stretch overflow-hidden">
                    <div className="flex w-16 shrink-0 flex-col items-center justify-center bg-marine-50 text-marine-700">
                      <Clock size={16} />
                      <span className="mt-1 text-xs font-bold">
                        {fmtTime(e.debut)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 px-4 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-marine-900">
                          {e.titre}
                        </h3>
                        <Badge className={eventTypeColor[e.type]}>{e.type}</Badge>
                      </div>
                      {e.lieu && (
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} /> {e.lieu}
                          {e.fin && <span>· jusqu'à {fmtTime(e.fin)}</span>}
                        </p>
                      )}
                      {e.description && (
                        <p className="mt-1.5 text-sm text-slate-600">
                          {e.description}
                        </p>
                      )}
                      <div className="mt-2 flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setEdit(e);
                            setOpen(true);
                          }}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-marine-50 hover:text-marine-700"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() =>
                            confirm("Supprimer cet événement ?") &&
                            deleteEvenement(e.id)
                          }
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-passion-50 hover:text-passion-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {edit && (
        <Modal open={open} onClose={() => setOpen(false)} title="Événement">
          <EvenementForm evt={edit} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </>
  );
}

function EvenementForm({
  evt,
  onClose,
}: {
  evt: Evenement;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Evenement>(evt);
  const set = <K extends keyof Evenement>(k: K, v: Evenement[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const save = () => {
    if (!draft.titre.trim()) return;
    upsertEvenement(draft);
    onClose();
  };

  return (
    <div className="space-y-4">
      <Field label="Titre">
        <Input
          value={draft.titre}
          onChange={(e) => set("titre", e.target.value)}
          placeholder="Ex : Conseil municipal"
        />
      </Field>
      <Field label="Type">
        <Select
          value={draft.type}
          onChange={(e) => set("type", e.target.value as EvenementType)}
        >
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Début">
          <Input
            type="datetime-local"
            value={toLocalInput(draft.debut)}
            onChange={(e) => set("debut", fromLocalInput(e.target.value))}
          />
        </Field>
        <Field label="Fin">
          <Input
            type="datetime-local"
            value={draft.fin ? toLocalInput(draft.fin) : ""}
            onChange={(e) =>
              set("fin", e.target.value ? fromLocalInput(e.target.value) : undefined)
            }
          />
        </Field>
      </div>
      <Field label="Lieu">
        <Input
          value={draft.lieu}
          onChange={(e) => set("lieu", e.target.value)}
          placeholder="Ex : Salle du conseil - Mairie"
        />
      </Field>
      <Field label="Description">
        <Textarea
          value={draft.description ?? ""}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Ordre du jour, précisions…"
          className="min-h-16"
        />
      </Field>
      <Button className="w-full" onClick={save}>
        Enregistrer
      </Button>
    </div>
  );
}
