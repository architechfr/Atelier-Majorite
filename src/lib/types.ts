// Modèle de données — Ferrières Passionnément
// Conçu pour être branché ensuite sur Supabase (mêmes noms de champs en camelCase).

export type ID = string;

export type ActualiteCategorie = "Actualité" | "Projet" | "Communiqué";
export type ActualiteStatut = "Brouillon" | "Publié";

export interface Actualite {
  id: ID;
  titre: string;
  categorie: ActualiteCategorie;
  statut: ActualiteStatut;
  resume: string;
  contenu: string;
  auteur: string;
  date: string; // ISO
  image?: string; // URL ou emoji de couverture
}

export type EvenementType =
  | "Conseil municipal"
  | "Permanence"
  | "Commission"
  | "Événement"
  | "Réunion";

export interface Evenement {
  id: ID;
  titre: string;
  type: EvenementType;
  debut: string; // ISO datetime
  fin?: string; // ISO datetime
  lieu: string;
  description?: string;
  participants?: string[];
}

export type SignalementCategorie =
  | "Voirie"
  | "Propreté"
  | "Espaces verts"
  | "Éclairage"
  | "Sécurité"
  | "Autre";

export type SignalementStatut =
  | "Nouveau"
  | "En cours"
  | "Résolu"
  | "Rejeté";

export type SignalementPriorite = "Basse" | "Moyenne" | "Haute";

export interface Signalement {
  id: ID;
  titre: string;
  categorie: SignalementCategorie;
  statut: SignalementStatut;
  priorite: SignalementPriorite;
  description: string;
  adresse: string;
  citoyen: string;
  contact?: string;
  dateCreation: string; // ISO
  eluAssigne?: ID;
}

export interface Permanence {
  jour: string; // ex "Mardi"
  heure: string; // ex "17h - 19h"
  lieu: string;
}

export interface Elu {
  id: ID;
  prenom: string;
  nom: string;
  fonction: string;
  delegation?: string;
  email: string;
  telephone?: string;
  couleur: string; // accent visuel pour l'avatar
  permanence?: Permanence;
}
