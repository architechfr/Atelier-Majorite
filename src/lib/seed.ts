import type { Actualite, Elu, Evenement, Signalement } from "./types";

// Données de démonstration (fictives) pour Ferrières-en-Brie.
// Remplacées dès qu'une vraie base (Supabase) est branchée.

// Couleurs cyclées depuis la charte (marine / atelier / or)
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

const now = new Date("2026-06-19T09:00:00");
const day = (offset: number, h = 9, m = 0) => {
  const d = new Date(now);
  d.setDate(d.getDate() + offset);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

export const ACTUALITES: Actualite[] = [
  {
    id: "act-1",
    titre: "Réaménagement de la place de l'Église : le chantier démarre",
    categorie: "Projet",
    statut: "Publié",
    resume:
      "Les travaux de requalification du cœur de village commencent début juillet pour 4 mois.",
    contenu:
      "Conformément à nos engagements, la place de l'Église fait peau neuve : nouveaux revêtements, végétalisation, mobilier urbain et mise en accessibilité. Les commerces resteront ouverts pendant toute la durée des travaux.",
    auteur: "Clément Joly",
    date: day(-2, 10),
    image: "🏛️",
  },
  {
    id: "act-2",
    titre: "Ouverture des inscriptions au centre de loisirs d'été",
    categorie: "Actualité",
    statut: "Publié",
    resume:
      "Inscriptions ouvertes jusqu'au 30 juin pour les vacances de juillet et août.",
    contenu:
      "Le centre de loisirs accueillera les enfants de 3 à 12 ans tout l'été avec un programme renouvelé : sorties, ateliers nature et grands jeux. Inscriptions au guichet famille ou en ligne.",
    auteur: "Léonore Freitas",
    date: day(-5, 14),
    image: "☀️",
  },
  {
    id: "act-3",
    titre: "Nouveau city-stade au parc des Sports",
    categorie: "Projet",
    statut: "Publié",
    resume:
      "Un terrain multisports en accès libre sera livré à la rentrée de septembre.",
    contenu:
      "Foot, basket, hand : le nouveau city-stade répondra à une forte demande des jeunes Ferrièrois. Un engagement de campagne tenu, financé en partie par le Département.",
    auteur: "Xavier Teupootahiti",
    date: day(-9, 11),
    image: "⚽",
  },
  {
    id: "act-4",
    titre: "Compte-rendu du conseil municipal du 12 juin",
    categorie: "Communiqué",
    statut: "Brouillon",
    resume:
      "Synthèse des délibérations : budget supplémentaire, subventions associatives, voirie.",
    contenu:
      "Le conseil a adopté le budget supplémentaire 2026 et voté les subventions aux associations. Le compte-rendu complet sera publié après validation.",
    auteur: "Mireille Munch",
    date: day(-1, 16),
    image: "📋",
  },
];

export const EVENEMENTS: Evenement[] = [
  {
    id: "evt-1",
    titre: "Conseil municipal",
    type: "Conseil municipal",
    debut: day(8, 20, 0),
    fin: day(8, 22, 30),
    lieu: "Salle du conseil - Mairie",
    description: "Ordre du jour : finances, urbanisme, questions diverses.",
    participants: ["Hervé Martin", "Sophie Lemoine", "Karim Benali"],
  },
  {
    id: "evt-2",
    titre: "Permanence urbanisme",
    type: "Permanence",
    debut: day(0, 17, 0),
    fin: day(0, 19, 0),
    lieu: "Mairie - bureau 2",
    description: "Sophie Lemoine reçoit sur rendez-vous et sans rendez-vous.",
  },
  {
    id: "evt-3",
    titre: "Commission travaux",
    type: "Commission",
    debut: day(3, 18, 30),
    fin: day(3, 20, 0),
    lieu: "Mairie - salle 1",
    description: "Suivi du chantier place de l'Église et programme voirie.",
  },
  {
    id: "evt-4",
    titre: "Fête de la musique",
    type: "Événement",
    debut: day(2, 18, 0),
    fin: day(2, 23, 59),
    lieu: "Parc du château",
    description: "Scène ouverte, food-trucks et concerts. Présence des élus.",
  },
  {
    id: "evt-5",
    titre: "Réunion de majorité",
    type: "Réunion",
    debut: day(6, 19, 0),
    fin: day(6, 20, 30),
    lieu: "Mairie - salle 1",
    description: "Préparation du conseil municipal et points d'actualité.",
  },
];

export const SIGNALEMENTS: Signalement[] = [
  {
    id: "sig-1",
    titre: "Nid-de-poule rue de la Brie",
    categorie: "Voirie",
    statut: "En cours",
    priorite: "Haute",
    description:
      "Trou important sur la chaussée à hauteur du n°14, dangereux pour les deux-roues.",
    adresse: "14 rue de la Brie",
    citoyen: "M. Durand",
    contact: "06 12 34 56 78",
    dateCreation: day(-3, 8, 30),
    eluAssigne: "elu-6",
  },
  {
    id: "sig-2",
    titre: "Lampadaire en panne avenue du Parc",
    categorie: "Éclairage",
    statut: "Nouveau",
    priorite: "Moyenne",
    description: "Éclairage public éteint depuis plusieurs nuits, zone sombre.",
    adresse: "Avenue du Parc, près de l'arrêt de bus",
    citoyen: "Mme Leroy",
    dateCreation: day(-1, 21, 10),
  },
  {
    id: "sig-3",
    titre: "Dépôt sauvage près des conteneurs",
    categorie: "Propreté",
    statut: "Nouveau",
    priorite: "Moyenne",
    description: "Encombrants déposés à côté du point d'apport volontaire.",
    adresse: "Rue des Tilleuls",
    citoyen: "M. Bernard",
    contact: "ferrierois77@email.fr",
    dateCreation: day(0, 7, 45),
  },
  {
    id: "sig-4",
    titre: "Banc cassé au square des Enfants",
    categorie: "Espaces verts",
    statut: "Résolu",
    priorite: "Basse",
    description: "Lame de banc descellée, réparée par les services techniques.",
    adresse: "Square des Enfants",
    citoyen: "Mme Moreau",
    dateCreation: day(-12, 15, 0),
    eluAssigne: "elu-7",
  },
  {
    id: "sig-5",
    titre: "Stationnement gênant récurrent",
    categorie: "Sécurité",
    statut: "En cours",
    priorite: "Haute",
    description:
      "Véhicules garés sur le passage piéton aux abords de l'école.",
    adresse: "Devant le groupe scolaire",
    citoyen: "Conseil d'école",
    dateCreation: day(-4, 9, 0),
    eluAssigne: "elu-8",
  },
];
