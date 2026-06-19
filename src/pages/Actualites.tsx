import { useState } from "react";
import { Newspaper, Plus, Pencil, Trash2 } from "lucide-react";
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
  deleteActualite,
  uid,
  upsertActualite,
  useActualites,
} from "../lib/store";
import { useAuth } from "../lib/auth";
import { fmtDate } from "../lib/format";
import type {
  Actualite,
  ActualiteCategorie,
  ActualiteStatut,
} from "../lib/types";

const CATEGORIES: ActualiteCategorie[] = ["Actualité", "Projet", "Communiqué"];
const EMOJIS = ["📰", "🏛️", "⚽", "☀️", "🌳", "🎉", "🚧", "📋", "🏫", "💧"];

const catColor: Record<ActualiteCategorie, string> = {
  Actualité: "bg-marine-50 text-marine-700",
  Projet: "bg-atelier-50 text-atelier-700",
  Communiqué: "bg-or-50 text-or-600",
};

export default function Actualites() {
  const actualites = useActualites();
  const { session } = useAuth();
  const [filtre, setFiltre] = useState<"Tous" | ActualiteStatut>("Tous");
  const [edit, setEdit] = useState<Actualite | null>(null);
  const [open, setOpen] = useState(false);

  const liste = actualites
    .filter((a) => filtre === "Tous" || a.statut === filtre)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const nouveau = () => {
    setEdit({
      id: uid(),
      titre: "",
      categorie: "Actualité",
      statut: "Brouillon",
      resume: "",
      contenu: "",
      auteur: session?.name ?? "",
      date: new Date().toISOString(),
      image: "📰",
    });
    setOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Actualités & projets"
        subtitle="Communiquez sur la vie de la commune."
        action={
          <Button onClick={nouveau} className="shrink-0">
            <Plus size={18} /> <span className="hidden sm:inline">Nouvelle</span>
          </Button>
        }
      />

      <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar">
        {(["Tous", "Publié", "Brouillon"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              filtre === f
                ? "bg-marine-700 text-white"
                : "bg-white text-marine-600 ring-1 ring-marine-900/5"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {liste.length === 0 ? (
        <EmptyState
          icon={<Newspaper size={40} />}
          title="Aucune publication"
          hint="Créez votre première actualité."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {liste.map((a) => (
            <Card key={a.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl">{a.image}</span>
                <div className="flex gap-1.5">
                  <Badge className={catColor[a.categorie]}>{a.categorie}</Badge>
                  {a.statut === "Brouillon" && (
                    <Badge className="bg-slate-100 text-slate-500">
                      Brouillon
                    </Badge>
                  )}
                </div>
              </div>
              <h3 className="mt-3 font-bold leading-snug text-marine-900">
                {a.titre || "(Sans titre)"}
              </h3>
              <p className="mt-1.5 line-clamp-3 flex-1 text-sm text-slate-600">
                {a.resume}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <p className="text-xs text-slate-400">
                  {a.auteur} · {fmtDate(a.date)}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEdit(a);
                      setOpen(true);
                    }}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-marine-50 hover:text-marine-700"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() =>
                      confirm("Supprimer cette publication ?") &&
                      deleteActualite(a.id)
                    }
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-passion-50 hover:text-passion-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ActualiteForm
        open={open}
        actu={edit}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

function ActualiteForm({
  open,
  actu,
  onClose,
}: {
  open: boolean;
  actu: Actualite | null;
  onClose: () => void;
}) {
  if (!actu) return null;
  return (
    <Modal open={open} onClose={onClose} title="Publication">
      <FormBody actu={actu} onClose={onClose} />
    </Modal>
  );
}

function FormBody({ actu, onClose }: { actu: Actualite; onClose: () => void }) {
  const [draft, setDraft] = useState<Actualite>(actu);
  const set = <K extends keyof Actualite>(k: K, v: Actualite[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const save = (statut: ActualiteStatut) => {
    if (!draft.titre.trim()) return;
    upsertActualite({ ...draft, statut });
    onClose();
  };

  return (
    <div className="space-y-4">
      <Field label="Titre">
        <Input
          value={draft.titre}
          onChange={(e) => set("titre", e.target.value)}
          placeholder="Titre de la publication"
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Catégorie">
          <Select
            value={draft.categorie}
            onChange={(e) =>
              set("categorie", e.target.value as ActualiteCategorie)
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Visuel">
          <div className="flex flex-wrap gap-1.5">
            {EMOJIS.map((em) => (
              <button
                key={em}
                type="button"
                onClick={() => set("image", em)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition ${
                  draft.image === em
                    ? "bg-marine-100 ring-2 ring-marine-400"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
              >
                {em}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <Field label="Résumé">
        <Textarea
          value={draft.resume}
          onChange={(e) => set("resume", e.target.value)}
          placeholder="Court résumé affiché dans la liste"
          className="min-h-16"
        />
      </Field>

      <Field label="Contenu">
        <Textarea
          value={draft.contenu}
          onChange={(e) => set("contenu", e.target.value)}
          placeholder="Texte complet de la publication"
        />
      </Field>

      <div className="flex gap-2 pt-2">
        <Button variant="soft" className="flex-1" onClick={() => save("Brouillon")}>
          Enregistrer en brouillon
        </Button>
        <Button className="flex-1" onClick={() => save("Publié")}>
          Publier
        </Button>
      </div>
    </div>
  );
}
