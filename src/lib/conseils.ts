// Conseils municipaux 2026 — Ferrières-en-Brie.
// Données réelles extraites des convocations transmises aux élus.
// Les fichiers (convocation, PV, annexes) seront rattachés via `fichiers`
// une fois l'accès sécurisé (auth Firebase/Supabase) — non versionnés ici.

export interface Deliberation {
  num: number;
  rubrique: string;
  intitule: string;
}

export interface ConseilFichier {
  nom: string;
  type: "convocation" | "pv" | "annexe";
  url?: string; // renseigné plus tard, après sécurisation de l'accès
}

export interface Conseil {
  id: string;
  date: string; // ISO (date de séance)
  dateLabel: string; // ex. "Vendredi 19 juin 2026"
  heure: string; // ex. "20 h 30"
  lieu: string;
  diffuse: boolean; // séance filmée et retransmise en direct
  prelim: string[]; // points d'ordre du jour avant les délibérations numérotées
  delibs: Deliberation[];
  questionsDiverses: boolean;
  pvStatut: string; // état du procès-verbal
  fichiers: ConseilFichier[];
}

// Couleur d'accent par rubrique (pour les pastilles)
export const RUBRIQUE_COLOR: Record<string, string> = {
  FINANCES: "#1E8E5A",
  "ADMINISTRATION GÉNÉRALE": "#16324F",
  "ENFANCE / JEUNESSE": "#D35400",
  "SERVICE TECHNIQUE": "#2980B9",
  ASSOCIATIONS: "#7A5BD6",
  CAMG: "#BE8E3C",
  "RESSOURCES HUMAINES": "#0F7B6C",
};

const LIEU = "Mairie annexe — Salle Rothschild (24, rue Jean Jaurès)";

// Triés du plus récent au plus ancien.
export const CONSEILS: Conseil[] = [
  {
    id: "cm-2026-06-19",
    date: "2026-06-19",
    dateLabel: "Vendredi 19 juin 2026",
    heure: "20 h 30",
    lieu: LIEU,
    diffuse: true,
    prelim: [
      "Désignation d'un secrétaire de séance",
      "Communications du Maire",
      "Approbation du procès-verbal du 22 mai 2026",
    ],
    delibs: [
      { num: 1, rubrique: "CAMG", intitule: "Demandes de subventions au Fonds de Concours pour la Transition Écologique de Marne et Gondoire" },
      { num: 2, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Fixation des modalités d'utilisation d'un local mis à la disposition de la minorité municipale" },
      { num: 3, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Désignation d'un correspondant défense" },
      { num: 4, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Avenant n°2 à la convention de mise à disposition du service de la police municipale de Bussy-Saint-Georges aux communes de Bussy-Saint-Martin, Ferrières-en-Brie, Guermantes, Jossigny, Saint-Thibault-des-Vignes et Collégien" },
      { num: 5, rubrique: "ENFANCE / JEUNESSE", intitule: "Subventionnement Imagin'R 2026" },
      { num: 6, rubrique: "ENFANCE / JEUNESSE", intitule: "Fixation des tarifs des mini-séjours été 2026" },
      { num: 7, rubrique: "SERVICE TECHNIQUE", intitule: "Groupement de commandes SDESM d'éclairage public 2027-2030" },
      { num: 8, rubrique: "ASSOCIATIONS", intitule: "Subventions aux associations" },
    ],
    questionsDiverses: true,
    pvStatut: "Procès-verbal signé",
    fichiers: [
      { nom: "Convocation", type: "convocation" },
      { nom: "Dossier du Conseil Municipal", type: "annexe" },
      { nom: "Subventions 2026 — propositions de la commission", type: "annexe" },
      { nom: "Convention d'occupation d'un local", type: "annexe" },
      { nom: "Délégation de pouvoir ECV", type: "annexe" },
      { nom: "Procès-verbal signé", type: "pv" },
    ],
  },
  {
    id: "cm-2026-05-22",
    date: "2026-05-22",
    dateLabel: "Vendredi 22 mai 2026",
    heure: "20 h 30",
    lieu: LIEU,
    diffuse: true,
    prelim: [
      "Désignation d'un secrétaire de séance",
      "Communications du Maire",
      "Approbation du procès-verbal du 3 avril 2026",
      "Approbation du procès-verbal du 17 avril 2026",
    ],
    delibs: [
      { num: 1, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Désignation d'un représentant au Groupement d'intérêt public ID 77" },
      { num: 2, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Désignation du délégué élu au CNAS" },
      { num: 3, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Désignation d'un élu référent forêt-bois" },
      { num: 4, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Désignation des membres de la CCID" },
      { num: 5, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Désignation des membres extérieurs des commissions municipales" },
      { num: 6, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Désignation d'un représentant à la CLECT (Commission Locale d'Évaluation des Charges Transférées)" },
      { num: 7, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Rétrocession d'une concession funéraire" },
      { num: 8, rubrique: "RESSOURCES HUMAINES", intitule: "Fixation du nombre de représentants du personnel au sein du Comité Social Territorial (CST) et maintien du paritarisme numérique" },
      { num: 9, rubrique: "RESSOURCES HUMAINES", intitule: "Recrutement d'agents contractuels sur des emplois non permanents pour faire face à un besoin lié à un accroissement saisonnier d'activité" },
      { num: 10, rubrique: "ENFANCE / JEUNESSE", intitule: "Fixation des tarifs des stages d'été" },
    ],
    questionsDiverses: true,
    pvStatut: "Procès-verbal adopté le 19 juin 2026",
    fichiers: [
      { nom: "Convocation", type: "convocation" },
      { nom: "Dossier du Conseil Municipal", type: "annexe" },
      { nom: "Délégation de pouvoir ECV", type: "annexe" },
      { nom: "Procès-verbal du 3 avril 2026", type: "pv" },
      { nom: "Procès-verbal du 17 avril 2026", type: "pv" },
    ],
  },
  {
    id: "cm-2026-04-17",
    date: "2026-04-17",
    dateLabel: "Vendredi 17 avril 2026",
    heure: "20 h 30",
    lieu: LIEU,
    diffuse: true,
    prelim: ["Désignation d'un secrétaire de séance", "Communications du Maire"],
    delibs: [
      { num: 1, rubrique: "FINANCES", intitule: "Compte financier unique 2025, Commune" },
      { num: 2, rubrique: "FINANCES", intitule: "Affectation du résultat" },
      { num: 3, rubrique: "FINANCES", intitule: "Vote des taux 2026" },
      { num: 4, rubrique: "FINANCES", intitule: "Délibération portant sur les Autorisations de programme — Crédit de paiement (AP/CP)" },
      { num: 5, rubrique: "FINANCES", intitule: "Budget primitif 2026, Commune" },
      { num: 6, rubrique: "FINANCES", intitule: "Fongibilité des crédits" },
      { num: 7, rubrique: "FINANCES", intitule: "Attribution d'une subvention de fonctionnement au Centre Communal d'Action Sociale (CCAS) de Ferrières-en-Brie au titre de l'exercice 2026" },
      { num: 8, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Élection des membres de la Commission d'Appel d'Offres" },
      { num: 9, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Création des commissions municipales" },
      { num: 10, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Désignation des membres des commissions municipales" },
      { num: 11, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Règlement intérieur des commissions municipales" },
      { num: 12, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Règlement intérieur du Conseil municipal" },
      { num: 13, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Désignation des membres de la commission de contrôle des listes électorales" },
      { num: 14, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Composition du Conseil d'administration du Centre Communal d'Action Sociale (CCAS)" },
      { num: 15, rubrique: "ADMINISTRATION GÉNÉRALE", intitule: "Élection des membres du Conseil d'administration du Centre Communal d'Action Sociale (CCAS)" },
    ],
    questionsDiverses: true,
    pvStatut: "Procès-verbal adopté le 22 mai 2026",
    fichiers: [
      { nom: "Convocation", type: "convocation" },
      { nom: "Dossier du Conseil Municipal — Budget", type: "annexe" },
      { nom: "Note de présentation brève et synthétique 2026", type: "annexe" },
      { nom: "Rapport de présentation du Compte Financier Unique 2025", type: "annexe" },
      { nom: "Règlement intérieur du Conseil municipal", type: "annexe" },
      { nom: "Règlement intérieur des commissions", type: "annexe" },
    ],
  },
];
