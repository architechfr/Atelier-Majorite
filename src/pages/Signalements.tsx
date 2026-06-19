import { useState } from "react";
import { MessageSquareWarning, Plus, MapPin, User, Trash2 } from "lucide-react";
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
  deleteSignalement,
  uid,
  upsertSignalement,
  useElus,
  useSignalements,
} from "../lib/store";
import {
  categorieIcon,
  fmtDateTime,
  prioriteSignalement,
  statutSignalement,
} from "../lib/format";
import type {
  Signalement,
  SignalementCategorie,
  SignalementPriorite,
  SignalementStatut,
} from "../lib/types";

const CATS: SignalementCategorie[] = [
  "Voirie",
  "Propreté",
  "Espaces verts",
  "Éclairage",
  "Sécurité",
  "Autre",
];
const STATUTS: SignalementStatut[] = ["Nouveau", "En cours", "Résolu", "Rejeté"];
const PRIOS: SignalementPriorite[] = ["Basse", "Moyenne", "Haute"];

export default function Signalements() {
  const signalements = useSignalements();
  const elus = useElus();
  const [filtre, setFiltre] = useState<"Tous" | SignalementStatut>("Tous");
  const [edit, setEdit] = useState<Signalement | null>(null);
  const [open, setOpen] = useState(false);

  const liste = signalements
    .filter((s) => filtre === "Tous" || s.statut === filtre)
    .sort((a, b) => +new Date(b.dateCreation) - +new Date(a.dateCreation));

  const count = (st: SignalementStatut) =>
    signalements.filter((s) => s.statut === st).length;

  const nouveau = () => {
    setEdit({
      id: uid(),
      titre: "",
      categorie: "Voirie",
      statut: "Nouveau",
      priorite: "Moyenne",
      description: "",
      adresse: "",
      citoyen: "",
      dateCreation: new Date().toISOString(),
    });
    setOpen(true);
  };

  const setStatut = (s: Signalement, statut: SignalementStatut) =>
    upsertSignalement({ ...s, statut });

  return (
    <>
      <PageHeader
        title="Signalements citoyens"
        subtitle="Suivez et traitez les demandes des habitants."
        action={
          <Button onClick={nouveau} className="shrink-0">
            <Plus size={18} /> <span className="hidden sm:inline">Nouveau</span>
          </Button>
        }
      />

      <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar">
        {(["Tous", ...STATUTS] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              filtre === f
                ? "bg-marine-700 text-white"
                : "bg-white text-marine-600 ring-1 ring-marine-900/5"
            }`}
          >
            {f}
            {f !== "Tous" && (
              <span
                className={`rounded-full px-1.5 text-xs ${
                  filtre === f ? "bg-white/20" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count(f as SignalementStatut)}
              </span>
            )}
          </button>
        ))}
      </div>

      {liste.length === 0 ? (
        <EmptyState
          icon={<MessageSquareWarning size={40} />}
          title="Aucun signalement"
          hint="Les signalements des habitants apparaîtront ici."
        />
      ) : (
        <div className="space-y-3">
          {liste.map((s) => {
            const st = statutSignalement[s.statut];
            const elu = elus.find((e) => e.id === s.eluAssigne);
            return (
              <Card key={s.id} className="p-4">
                <div className="flex gap-3">
                  <span className="text-2xl">{categorieIcon[s.categorie]}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-marine-900">{s.titre}</h3>
                      <Badge className={prioriteSignalement[s.priorite]}>
                        {s.priorite}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {s.adresse}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} /> {s.citoyen}
                      </span>
                      <span>{fmtDateTime(s.dateCreation)}</span>
                    </div>
                    {elu && (
                      <p className="mt-1.5 text-xs font-medium text-marine-600">
                        Suivi par {elu.prenom} {elu.nom}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                  <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${st.bg} ${st.text}`}>
                    <span className={`h-2 w-2 rounded-full ${st.dot}`} /> {s.statut}
                  </span>
                  <div className="flex-1" />
                  <Select
                    value={s.statut}
                    onChange={(e) =>
                      setStatut(s, e.target.value as SignalementStatut)
                    }
                    className="!w-auto !py-1.5 text-xs"
                  >
                    {STATUTS.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </Select>
                  <button
                    onClick={() => {
                      setEdit(s);
                      setOpen(true);
                    }}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-marine-600 hover:bg-marine-50"
                  >
                    Détails
                  </button>
                  <button
                    onClick={() =>
                      confirm("Supprimer ce signalement ?") &&
                      deleteSignalement(s.id)
                    }
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-passion-50 hover:text-passion-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {edit && (
        <Modal open={open} onClose={() => setOpen(false)} title="Signalement">
          <SignalementForm sig={edit} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </>
  );
}

function SignalementForm({
  sig,
  onClose,
}: {
  sig: Signalement;
  onClose: () => void;
}) {
  const elus = useElus();
  const [draft, setDraft] = useState<Signalement>(sig);
  const set = <K extends keyof Signalement>(k: K, v: Signalement[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const save = () => {
    if (!draft.titre.trim()) return;
    upsertSignalement(draft);
    onClose();
  };

  return (
    <div className="space-y-4">
      <Field label="Objet">
        <Input
          value={draft.titre}
          onChange={(e) => set("titre", e.target.value)}
          placeholder="Ex : Nid-de-poule rue de la Brie"
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Catégorie">
          <Select
            value={draft.categorie}
            onChange={(e) =>
              set("categorie", e.target.value as SignalementCategorie)
            }
          >
            {CATS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Priorité">
          <Select
            value={draft.priorite}
            onChange={(e) =>
              set("priorite", e.target.value as SignalementPriorite)
            }
          >
            {PRIOS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Description">
        <Textarea
          value={draft.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Détail du problème signalé"
        />
      </Field>
      <Field label="Adresse / lieu">
        <Input
          value={draft.adresse}
          onChange={(e) => set("adresse", e.target.value)}
          placeholder="Localisation"
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Déclarant">
          <Input
            value={draft.citoyen}
            onChange={(e) => set("citoyen", e.target.value)}
            placeholder="Nom de l'habitant"
          />
        </Field>
        <Field label="Contact">
          <Input
            value={draft.contact ?? ""}
            onChange={(e) => set("contact", e.target.value)}
            placeholder="Tél. ou e-mail"
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Statut">
          <Select
            value={draft.statut}
            onChange={(e) => set("statut", e.target.value as SignalementStatut)}
          >
            {STATUTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </Field>
        <Field label="Élu référent">
          <Select
            value={draft.eluAssigne ?? ""}
            onChange={(e) => set("eluAssigne", e.target.value || undefined)}
          >
            <option value="">— Non assigné —</option>
            {elus.map((el) => (
              <option key={el.id} value={el.id}>
                {el.prenom} {el.nom}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Button className="w-full" onClick={save}>
        Enregistrer
      </Button>
    </div>
  );
}
