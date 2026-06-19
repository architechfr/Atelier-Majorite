import type {
  EvenementType,
  SignalementCategorie,
  SignalementPriorite,
  SignalementStatut,
} from "./types";

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const fmtDateShort = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });

export const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const fmtDateTime = (iso: string) =>
  `${fmtDate(iso)} à ${fmtTime(iso)}`;

// Classes Tailwind par statut de signalement
export const statutSignalement: Record<
  SignalementStatut,
  { bg: string; text: string; dot: string }
> = {
  Nouveau: { bg: "bg-passion-50", text: "text-passion-700", dot: "bg-passion-500" },
  "En cours": { bg: "bg-or-50", text: "text-or-600", dot: "bg-or-400" },
  Résolu: { bg: "bg-atelier-50", text: "text-atelier-700", dot: "bg-atelier-500" },
  Rejeté: { bg: "bg-slate-100", text: "text-slate-500", dot: "bg-slate-400" },
};

export const prioriteSignalement: Record<SignalementPriorite, string> = {
  Basse: "text-slate-500 bg-slate-100",
  Moyenne: "text-amber-700 bg-amber-50",
  Haute: "text-passion-700 bg-passion-50",
};

export const categorieIcon: Record<SignalementCategorie, string> = {
  Voirie: "🛣️",
  Propreté: "🗑️",
  "Espaces verts": "🌳",
  Éclairage: "💡",
  Sécurité: "🚸",
  Autre: "📌",
};

export const eventTypeColor: Record<EvenementType, string> = {
  "Conseil municipal": "bg-marine-700 text-white",
  Permanence: "bg-atelier-500 text-white",
  Commission: "bg-marine-400 text-white",
  Événement: "bg-or-400 text-white",
  Réunion: "bg-atelier-300 text-marine-900",
};
