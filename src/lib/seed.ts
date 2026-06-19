import type { Actualite, Elu, Evenement, Signalement } from "./types";

// Données de démonstration (fictives) pour Ferrières-en-Brie.
// Remplacées dès qu'une vraie base (Supabase) est branchée.

export const ELUS: Elu[] = [
  {
    id: "elu-1",
    prenom: "Hervé",
    nom: "Martin",
    fonction: "Maire",
    delegation: "Stratégie & finances",
    email: "maire@ferrieres-passionnement.fr",
    telephone: "01 60 00 00 01",
    couleur: "#0b3a6f",
    permanence: { jour: "Samedi", heure: "9h - 12h", lieu: "Mairie" },
  },
  {
    id: "elu-2",
    prenom: "Sophie",
    nom: "Lemoine",
    fonction: "1ʳᵉ adjointe",
    delegation: "Urbanisme & cadre de vie",
    email: "urbanisme@ferrieres-passionnement.fr",
    telephone: "01 60 00 00 02",
    couleur: "#cf2c22",
    permanence: { jour: "Mardi", heure: "17h - 19h", lieu: "Mairie - bureau 2" },
  },
  {
    id: "elu-3",
    prenom: "Karim",
    nom: "Benali",
    fonction: "Adjoint",
    delegation: "Sécurité & tranquillité publique",
    email: "securite@ferrieres-passionnement.fr",
    telephone: "01 60 00 00 03",
    couleur: "#1c4886",
    permanence: { jour: "Jeudi", heure: "18h - 19h30", lieu: "Mairie" },
  },
  {
    id: "elu-4",
    prenom: "Nathalie",
    nom: "Dubois",
    fonction: "Adjointe",
    delegation: "Affaires scolaires & jeunesse",
    email: "ecoles@ferrieres-passionnement.fr",
    telephone: "01 60 00 00 04",
    couleur: "#2a5fa8",
    permanence: { jour: "Lundi", heure: "16h30 - 18h", lieu: "Groupe scolaire" },
  },
  {
    id: "elu-5",
    prenom: "Antoine",
    nom: "Roux",
    fonction: "Conseiller délégué",
    delegation: "Sports & vie associative",
    email: "sports@ferrieres-passionnement.fr",
    couleur: "#e2453a",
    permanence: { jour: "Mercredi", heure: "18h - 20h", lieu: "Gymnase" },
  },
  {
    id: "elu-6",
    prenom: "Claire",
    nom: "Petit",
    fonction: "Conseillère déléguée",
    delegation: "Culture & événements",
    email: "culture@ferrieres-passionnement.fr",
    couleur: "#4a80c7",
  },
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
    auteur: "Sophie Lemoine",
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
    auteur: "Nathalie Dubois",
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
    auteur: "Antoine Roux",
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
    auteur: "Hervé Martin",
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
    eluAssigne: "elu-2",
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
    eluAssigne: "elu-5",
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
    eluAssigne: "elu-3",
  },
];
