import type { Actualite, Elu, Evenement, Signalement } from "./types";

// Ferrières-en-Brie — données réelles.
// ELUS : liste réelle des élus de la majorité.
// ACTUALITES, EVENEMENTS, SIGNALEMENTS : vides — à alimenter via l'interface.

const PAL = [
  "#16324f",
  "#229268",
  "#eaa92b",
  "#2c5481",
  "#197a57",
  "#d8951a",
  "#4a73a0",
  "#38a87d",
];
const col = (i: number) => PAL[i % PAL.length];

export const ELUS: Elu[] = [
  // Maire
  { id: "elu-1", prenom: "Mireille", nom: "MUNCH", fonction: "Maire", delegation: "Direction générale de la commune", couleur: "#16324f" },

  // Maires-Adjoints
  { id: "elu-2", prenom: "Clément", nom: "JOLY", fonction: "1er Maire-Adjoint", delegation: "Finances · Urbanisme · Commande publique", couleur: col(1) },
  { id: "elu-3", prenom: "Laurène", nom: "DORIER", fonction: "Maire-Adjointe", delegation: "Vie locale · Tourisme · Santé", couleur: col(2) },
  { id: "elu-4", prenom: "Edie", nom: "ATRIDE", fonction: "Maire-Adjoint", delegation: "NTIC · Informatique · Vidéoprotection", couleur: col(3) },
  { id: "elu-5", prenom: "Patricia", nom: "DUVERGER", fonction: "Maire-Adjointe", delegation: "Culture · Animation · Vie associative", couleur: col(4) },
  { id: "elu-6", prenom: "Thierry", nom: "GOMES", fonction: "Maire-Adjoint", delegation: "Bâtiment · Patrimoine · Travaux", couleur: col(5) },
  { id: "elu-7", prenom: "Geneviève", nom: "GENDRE", fonction: "Maire-Adjointe", delegation: "Transition écologique · Environnement", couleur: col(6) },
  { id: "elu-8", prenom: "Guy", nom: "CABANIE", fonction: "Maire-Adjoint", delegation: "Sécurité · Police · Circulation", couleur: col(7) },
  { id: "elu-9", prenom: "Léonore", nom: "FREITAS", fonction: "Maire-Adjointe", delegation: "Enfance · Vie scolaire · Périscolaire", couleur: col(8) },

  // Conseillers municipaux de la majorité
  { id: "elu-10", prenom: "Annie", nom: "SPEYSER", fonction: "Conseillère municipale", delegation: "Fleurissement · Ville fleurie", couleur: col(9) },
  { id: "elu-11", prenom: "Martine", nom: "FITTE-REBETÉ", fonction: "Conseillère municipale", delegation: "Petite enfance · Crèche", couleur: col(10) },
  { id: "elu-12", prenom: "Anne", nom: "BOZZOLLA", fonction: "Conseillère municipale", delegation: "Seniors · Handicap · Lien intergénérationnel", couleur: col(11) },
  { id: "elu-13", prenom: "Medhi", nom: "ROI", fonction: "Conseiller municipal", delegation: "Prévention · Sécurité routière", couleur: col(12) },
  { id: "elu-14", prenom: "Stéphanie", nom: "BASTIAN", fonction: "Conseillère municipale", delegation: "Fêtes · Cérémonies officielles", couleur: col(13) },
  { id: "elu-15", prenom: "Florian", nom: "CLARISSE", fonction: "Conseiller municipal", delegation: "Communication · Réseaux sociaux", couleur: col(14) },
  { id: "elu-16", prenom: "Gaëlle", nom: "CORNET", fonction: "Conseillère municipale", delegation: "Subventions · Groupement de commande", couleur: col(15) },
  { id: "elu-17", prenom: "Xavier", nom: "TEUPOOTAHITI", fonction: "Conseiller municipal", delegation: "Jeunesse · Sport", couleur: col(16) },
  { id: "elu-18", prenom: "Mickaël", nom: "AMAR", fonction: "Conseiller municipal", delegation: "Développement économique", couleur: col(17) },
  { id: "elu-19", prenom: "Fanny", nom: "DEZERT", fonction: "Conseillère municipale", delegation: "Transports · Navette", couleur: col(18) },
  { id: "elu-20", prenom: "Mike", nom: "DA SILVA", fonction: "Conseiller municipal", delegation: "Tri sélectif · Compostage", couleur: col(19) },
  { id: "elu-21", prenom: "Mickaël", nom: "LANCHAS", fonction: "Conseiller municipal", delegation: "Rénovation énergétique", couleur: col(20) },
  { id: "elu-22", prenom: "Julien", nom: "LARGUINHO", fonction: "Conseiller municipal", delegation: "Accessibilité", couleur: col(21) },
];

export const ACTUALITES: Actualite[] = [];
export const EVENEMENTS: Evenement[] = [];
export const SIGNALEMENTS: Signalement[] = [];
