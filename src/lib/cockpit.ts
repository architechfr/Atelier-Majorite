// Données du cockpit « L'Atelier Majorité » — Ferrières-en-Brie.
// Reprises de la maquette de référence. Statiques pour le prototype,
// prêtes à être branchées sur Supabase (mêmes noms de champs).

export interface FilPost {
  id: string;
  nom: string;
  ini: string;
  couleur: string;
  role: string;
  tag: string;
  tagBg: string;
  tagText: string;
  titre: string;
  corps: string;
  epingle?: boolean;
  likes?: number;
  commentaires?: number;
}

export interface Projet {
  name: string;
  who: string;
  ini: string;
  deleg: string;
  progress: number;
  status: string;
  sc: string;
  due: string;
}

export interface Idee {
  t: string;
  who: string;
  ini: string;
  deleg: string;
  f: number;
  a: number;
  status: string;
  sc: string;
  total: number;
  pct: number;
}

export interface DocItem {
  t: string;
  who: string;
  date: string;
  status: string;
  sc: string;
}

export interface Convo {
  id: string;
  n: string;
  ini: string;
  last: string;
  time: string;
  unread: number;
  c: string;
}

export interface ChatMessage {
  name?: string;
  text: string;
  me?: boolean;
}

export interface AgendaItem {
  d: string;
  m: string;
  t: string;
  s: string;
  k: string;
  sc: string;
  hot?: boolean;
}

export interface KpiInd {
  label: string;
  value: string;
  delta: string;
  tone: string;
}

export interface Repartition {
  label: string;
  pct: number;
  color: string;
}

export interface Delegation {
  label: string;
  pct: number;
  color: string;
}

export type EchelonId =
  | "commune"
  | "interco"
  | "departement"
  | "region"
  | "etat";

export interface Echelon {
  tier: string;
  accent: string;
  name: string;
  sub: string;
  role: string;
  roleDetail: string;
  comps: string[];
  contact: string;
  dossiers: number;
}

export interface Contact {
  role: string;
  org: string;
  for: string;
  ref: string;
  ini: string;
  c: string;
}

export interface Financement {
  name: string;
  src: string;
  finance: string;
  deadline: string;
  ref: string;
  c: string;
}

// --- Fil de la majorité -------------------------------------------------------

const TAGS = {
  Conseil: { bg: "#EEF3FF", text: "#2F6BFF" },
  Urbanisme: { bg: "#EAEFF6", text: "#16324F" },
  Culture: { bg: "#FCEDEB", text: "#C0392B" },
  Sécurité: { bg: "#EDEFF2", text: "#34495E" },
  Écologie: { bg: "#E9F6F0", text: "#1E8E5A" },
} as const;

const tag = (k: keyof typeof TAGS) => ({ tag: k, tagBg: TAGS[k].bg, tagText: TAGS[k].text });

export const FIL: FilPost[] = [
  {
    id: "p1",
    nom: "Mireille Munch",
    ini: "MM",
    couleur: "#14304C",
    role: "Maire · il y a 2 h",
    titre: "Ordre du jour du conseil du 26 juin validé",
    corps:
      "Merci de relire les délibérations 2026-041 à 047 avant lundi soir. Vos retours sont attendus dans l'espace Documents, onglet « À voter ».",
    epingle: true,
    likes: 12,
    commentaires: 5,
    ...tag("Conseil"),
  },
  {
    id: "p2",
    nom: "Clément Joly",
    ini: "CJ",
    couleur: "#2F6BFF",
    role: "Adjoint Urbanisme · il y a 5 h",
    titre: "Permis ZAC du Bois : avis favorable",
    corps:
      "La commission a rendu un avis favorable assorti de réserves paysagères. Présentation détaillée au prochain bureau.",
    likes: 8,
    commentaires: 3,
    ...tag("Urbanisme"),
  },
  {
    id: "p3",
    nom: "Guy Cabanie",
    ini: "GC",
    couleur: "#34495E",
    role: "Adjoint Sécurité · hier",
    titre: "Bilan vidéoprotection — 2ᵉ trimestre",
    corps:
      "Déploiement à 88 %. Les caméras du centre-bourg seront actives avant la fête de la commune.",
    likes: 6,
    commentaires: 2,
    ...tag("Sécurité"),
  },
  {
    id: "p4",
    nom: "Patricia Duverger",
    ini: "PD",
    couleur: "#C0392B",
    role: "Adjointe Culture · hier",
    titre: "Fête de la commune le 5 juillet : appel aux bénévoles",
    corps:
      "Inscrivez-vous via l'agenda partagé. Nous avons besoin d'élus sur les stands, la logistique et l'accueil des associations.",
    likes: 9,
    commentaires: 4,
    ...tag("Culture"),
  },
  {
    id: "p5",
    nom: "Geneviève Gendre",
    ini: "GG",
    couleur: "#0F7B6C",
    role: "Adjointe Transition écologique · 2 jours",
    titre: "Composteurs partagés : 3 sites retenus",
    corps:
      "Quartiers de la Gare, du Château et des Tilleuls. Lancement après concertation avec les riverains en septembre.",
    likes: 14,
    commentaires: 6,
    ...tag("Écologie"),
  },
];

export const FIL_FILTRES = ["Tout", "Conseil", "Urbanisme", "Culture", "Sécurité"];

// --- Projets & délégations ----------------------------------------------------

export const PROJETS: Projet[] = [
  { name: "Rénovation énergétique du groupe scolaire", who: "Mickaël Lanchas", ini: "ML", deleg: "Rénovation énergétique", progress: 72, status: "En cours", sc: "#2F6BFF", due: "Sept. 2026" },
  { name: "Plan trottoir & accessibilité voirie", who: "Julien Larguinho", ini: "JL", deleg: "Accessibilité", progress: 45, status: "En cours", sc: "#2F6BFF", due: "Déc. 2026" },
  { name: "Vidéoprotection — phase 2", who: "Edie Atride", ini: "EA", deleg: "NTIC", progress: 88, status: "Livraison", sc: "#1E8E5A", due: "Juil. 2026" },
  { name: "Aire de jeux du parc du château", who: "Mickaël Lanchas", ini: "ML", deleg: "Aires de jeux", progress: 30, status: "Études", sc: "#BE8E3C", due: "2027" },
  { name: "Navette intercommunale seniors", who: "Fanny Dezert", ini: "FD", deleg: "Transports", progress: 55, status: "En cours", sc: "#2F6BFF", due: "Oct. 2026" },
];

export const PROJETS_STATS = [
  { value: 9, label: "En cours", color: "#2F6BFF" },
  { value: 3, label: "À l'étude", color: "#BE8E3C" },
  { value: 2, label: "En livraison", color: "#1E8E5A" },
];

// Délégations suivies — carte tableau de bord
export const DELEGATIONS: Delegation[] = [
  { label: "Vidéoprotection — phase 2", pct: 88, color: "#1E8E5A" },
  { label: "Refonte du site & app commune", pct: 61, color: "#2F6BFF" },
  { label: "Campagne réseaux sociaux été", pct: 35, color: "#BE8E3C" },
];

// --- Boîte à idées ------------------------------------------------------------

const idee = (x: Omit<Idee, "total" | "pct">): Idee => ({
  ...x,
  total: x.f + x.a,
  pct: Math.round((x.f / (x.f + x.a || 1)) * 100),
});

export const IDEES: Idee[] = [
  idee({ t: "Application mobile « Ferrières dans ma poche »", who: "Florian Clarisse", ini: "FC", deleg: "Communication", f: 18, a: 3, status: "En débat", sc: "#2F6BFF" }),
  idee({ t: "Composteurs partagés par quartier", who: "Mike Da Silva", ini: "MD", deleg: "Tri sélectif", f: 17, a: 0, status: "Adopté", sc: "#1E8E5A" }),
  idee({ t: "Navette seniors le samedi matin", who: "Anne Bozzolla", ini: "AB", deleg: "Seniors", f: 12, a: 2, status: "À l'étude", sc: "#BE8E3C" }),
  idee({ t: "Budget participatif jeunesse", who: "Xavier Teupootahiti", ini: "XT", deleg: "Jeunesse", f: 9, a: 1, status: "Nouveau", sc: "#6A7A92" }),
];

export const TOP_IDEE = {
  titre: "« Ferrières dans ma poche » — l'app citoyenne",
  pour: 18,
  total: 21,
};

// --- Documents & délibérations ------------------------------------------------

export const DOCS: DocItem[] = [
  { t: "Délib. 2026-041 — Subvention rénovation énergétique", date: "26 juin", status: "À voter", sc: "#BE8E3C", who: "Mickaël Lanchas" },
  { t: "Délib. 2026-042 — Plan trottoir accessibilité", date: "26 juin", status: "À voter", sc: "#BE8E3C", who: "Julien Larguinho" },
  { t: "Délib. 2026-039 — Tarifs périscolaire 2026", date: "12 juin", status: "Adopté", sc: "#1E8E5A", who: "Léonore Freitas" },
  { t: "Compte-rendu — Bureau municipal du 04/06", date: "04 juin", status: "Publié", sc: "#2F6BFF", who: "Mireille Munch" },
  { t: "Délib. 2026-040 — Vidéoprotection phase 2", date: "12 juin", status: "Adopté", sc: "#1E8E5A", who: "Edie Atride" },
  { t: "Note — Budget participatif jeunesse", date: "10 juin", status: "Brouillon", sc: "#6A7A92", who: "Xavier Teupootahiti" },
];

// --- Messagerie ---------------------------------------------------------------

export const CONVOS: Convo[] = [
  { id: "bm", n: "Bureau municipal", ini: "BM", last: "Mireille : on valide l'ordre du jour ?", time: "09:42", unread: 2, c: "#14304C" },
  { id: "cj", n: "Clément Joly", ini: "CJ", last: "Le tableau des finances est prêt.", time: "08:30", unread: 1, c: "#2F6BFF" },
  { id: "ct", n: "Commission Travaux", ini: "CT", last: "Thierry : RDV chantier jeudi 8 h", time: "hier", unread: 0, c: "#B8860B" },
  { id: "pd", n: "Patricia Duverger", ini: "PD", last: "Des bénévoles pour la fête ?", time: "hier", unread: 0, c: "#C0392B" },
];

export const THREAD: ChatMessage[] = [
  { name: "Mireille Munch", text: "Bonjour à tous, je propose l'ordre du jour du conseil du 26. Vos retours avant lundi ?" },
  { name: "Clément Joly", text: "Parfait pour la partie finances. Je joins le tableau d'exécution budgétaire." },
  { me: true, text: "Je relaie l'info sur les réseaux dès la validation. Visuel prêt côté com'." },
  { name: "Mireille Munch", text: "Merci Florian, c'est noté." },
];

export const THREAD_TITRE = {
  ini: "BM",
  nom: "Bureau municipal",
  membres: "Mireille, Clément, Laurène +5",
};

// --- Agenda & conseils --------------------------------------------------------

export const AGENDA: AgendaItem[] = [
  { d: "26", m: "JUIN", t: "Conseil municipal", s: "20:00 · Salle Rothschild", k: "Conseil", sc: "#2F6BFF", hot: true },
  { d: "02", m: "JUIL", t: "Commission Finances", s: "18:30 · Mairie annexe", k: "Commission", sc: "#BE8E3C" },
  { d: "05", m: "JUIL", t: "Fête de la commune", s: "14:00 · Parc du château", k: "Événement", sc: "#1E8E5A" },
  { d: "09", m: "JUIL", t: "Bureau municipal", s: "19:00 · Salle des mariages", k: "Bureau", sc: "#7A5BD6" },
];

// --- Indicateurs --------------------------------------------------------------

export const KPI_INDICATEURS: KpiInd[] = [
  { label: "Population", value: "3 927–3 932", delta: "habitants (estimation 2026)", tone: "#2F6BFF" },
  { label: "Budget 2026 exécuté", value: "68 %", delta: "au 19/06", tone: "#1E8E5A" },
  { label: "Demandes citoyens traitées", value: "91 %", delta: "+5 pts", tone: "#BE8E3C" },
  { label: "Présence aux conseils", value: "89 %", delta: "moyenne 2026", tone: "#14304C" },
];

export const BARS = [
  { m: "Jan", v: 42 },
  { m: "Fév", v: 55 },
  { m: "Mar", v: 61 },
  { m: "Avr", v: 48 },
  { m: "Mai", v: 73 },
  { m: "Juin", v: 67 },
].map((x) => ({ ...x, h: Math.round((x.v / 80) * 100) }));

export const REPARTITION: Repartition[] = [
  { label: "Urbanisme", pct: 34, color: "#2F6BFF" },
  { label: "État civil", pct: 28, color: "#1E8E5A" },
  { label: "Voirie & cadre de vie", pct: 21, color: "#BE8E3C" },
  { label: "Scolaire & périscolaire", pct: 17, color: "#7A5BD6" },
];

// --- Mon territoire -----------------------------------------------------------

export const ECHELONS: Record<EchelonId, Echelon> = {
  commune: { tier: "COMMUNE", accent: "#2F6BFF", name: "Ferrières-en-Brie", sub: "3 927 à 3 932 habitants · 77164", role: "Votre échelon", roleDetail: "Conseil municipal — 27 élus, Maire Mireille Munch.", comps: ["État civil", "Urbanisme & PLU", "Écoles maternelles & élémentaires", "Voirie communale", "Police municipale", "Culture, sport & associations"], contact: "Mireille Munch — Maire", dossiers: 14 },
  interco: { tier: "INTERCOMMUNALITÉ", accent: "#BE8E3C", name: "Marne et Gondoire", sub: "Communauté d'agglomération · 20 communes", role: "Ferrières y est représentée", roleDetail: "Mireille Munch, 1ʳᵉ Vice-Présidente · Clément Joly, délégué.", comps: ["Développement économique", "Transports & mobilités", "Habitat & PLUi", "Eau & assainissement", "Collecte des déchets", "Tourisme"], contact: "Présidence de la CAMG", dossiers: 6 },
  departement: { tier: "DÉPARTEMENT", accent: "#1E8E5A", name: "Seine-et-Marne (77)", sub: "Canton d'Ozoir-la-Ferrière", role: "Ferrières au Département", roleDetail: "Mireille Munch, Conseillère départementale du canton.", comps: ["Routes départementales", "Collèges", "Action sociale (RSA, PMI, autonomie)", "SDIS — pompiers", "Aides aux communes"], contact: "Conseil départemental 77", dossiers: 3 },
  region: { tier: "RÉGION", accent: "#C0392B", name: "Île-de-France", sub: "Conseil régional", role: "Relations régionales", roleDetail: "Via la CAMG et les contrats régionaux.", comps: ["Lycées", "Transports — Île-de-France Mobilités", "Développement économique", "Formation professionnelle", "Fonds européens"], contact: "Région Île-de-France", dossiers: 2 },
  etat: { tier: "ÉTAT", accent: "#34495E", name: "Préfecture de Seine-et-Marne", sub: "Sous-préfecture de Torcy", role: "Relation avec l'État", roleDetail: "Contrôle de légalité · dotations DETR / DSIL.", comps: ["Contrôle de légalité des actes", "Sécurité & ordre public", "Dotations d'investissement (DETR, DSIL)", "Organisation des élections", "Réglementation & autorisations"], contact: "Préfet / Sous-préfet de Torcy", dossiers: 4 },
};

// Pile des échelons (du plus large au plus local) pour la vue « Écosystème »
export const ECHELON_PILE: { id: EchelonId; label: string; dot: string; sub: string }[] = [
  { id: "etat", label: "ÉTAT", dot: "#34495E", sub: "Préfecture · Sous-préfecture de Torcy" },
  { id: "region", label: "RÉGION", dot: "#C0392B", sub: "Île-de-France" },
  { id: "departement", label: "DÉPARTEMENT", dot: "#1E8E5A", sub: "Seine-et-Marne · canton d'Ozoir-la-Ferrière" },
  { id: "interco", label: "INTERCOMMUNALITÉ", dot: "#BE8E3C", sub: "Marne et Gondoire" },
];

export const CONTACTS: Contact[] = [
  { role: "Préfet de Seine-et-Marne", org: "Préfecture · Melun", for: "Contrôle de légalité, sécurité, dotations DETR / DSIL.", ref: "Mireille Munch", ini: "PR", c: "#34495E" },
  { role: "Sous-préfet de Torcy", org: "Sous-préfecture", for: "Dossiers locaux, subventions, sécurité de proximité.", ref: "Guy Cabanie", ini: "SP", c: "#34495E" },
  { role: "Député de la circonscription", org: "Assemblée nationale", for: "Relais législatif, soutien et portage de projets.", ref: "Mireille Munch", ini: "AN", c: "#2F6BFF" },
  { role: "Sénateurs de Seine-et-Marne", org: "Sénat", for: "Représentation des collectivités territoriales.", ref: "Mireille Munch", ini: "SÉ", c: "#7A5BD6" },
  { role: "Président du Conseil départemental", org: "Département 77", for: "Routes, collèges, action sociale, aides aux communes.", ref: "Mireille Munch", ini: "CD", c: "#1E8E5A" },
  { role: "Président de Marne et Gondoire", org: "Communauté d'agglo.", for: "Compétences intercommunales et mutualisation.", ref: "Clément Joly", ini: "MG", c: "#BE8E3C" },
  { role: "Présidence Région Île-de-France", org: "Région IDF", for: "Transports, lycées, fonds régionaux et européens.", ref: "Fanny Dezert", ini: "RG", c: "#C0392B" },
  { role: "Syndicats (SDESM, eau…)", org: "Syndicats intercommunaux", for: "Énergie, rénovation, réseaux et mutualisation.", ref: "Mickaël Lanchas", ini: "SY", c: "#16A085" },
];

// Matrice « Qui fait quoi » — colonnes : commune, interco, dépt, région, état
const MATRIX_COLS: { key: string; tint: string }[] = [
  { key: "commune", tint: "#EEF3FF" },
  { key: "interco", tint: "#F7F1E3" },
  { key: "dept", tint: "#E9F6F0" },
  { key: "region", tint: "#FCEDEB" },
  { key: "etat", tint: "#EDEFF2" },
];

const MATRIX_ROWS: { d: string; m: Record<string, string> }[] = [
  { d: "Écoles & éducation", m: { commune: "Maternelle & élémentaire", dept: "Collèges", region: "Lycées" } },
  { d: "Voirie & routes", m: { commune: "Voies communales", dept: "Routes départementales" } },
  { d: "Transports", m: { interco: "Bus & navettes", region: "IDF Mobilités" } },
  { d: "Urbanisme", m: { commune: "PLU & permis", interco: "PLUi · SCoT" } },
  { d: "Eau, assainissement, déchets", m: { interco: "Compétence interco" } },
  { d: "Action sociale", m: { commune: "CCAS", dept: "RSA · PMI · autonomie" } },
  { d: "Développement économique", m: { interco: "Zones d'activités", region: "Aides entreprises" } },
  { d: "Sécurité", m: { commune: "Police municipale", etat: "Gendarmerie · Préfet" } },
  { d: "Environnement & énergie", m: { commune: "Espaces verts", interco: "Déchets", region: "Transition" } },
];

export const MATRIX_HEAD = ["DOMAINE", "Commune", "Interco", "Dépt 77", "Région", "État"];

export const MATRIX = MATRIX_ROWS.map((r) => ({
  d: r.d,
  cells: MATRIX_COLS.map(({ key, tint }) => {
    const val = r.m[key];
    return {
      label: val || "·",
      col: val ? "#16324F" : "#C7D0DD",
      bg: val ? tint : "transparent",
      strong: !!val,
    };
  }),
}));

export const FINANCEMENTS: Financement[] = [
  { name: "DETR / DSIL", src: "État", finance: "Investissement structurant : écoles, voirie, bâtiments publics.", deadline: "Dépôt avant le 31 janv. 2027", ref: "Gaëlle Cornet", c: "#34495E" },
  { name: "Aides départementales", src: "Département 77", finance: "Équipements de proximité, voirie, aires de jeux.", deadline: "Appel à projets — sept. 2026", ref: "Gaëlle Cornet", c: "#1E8E5A" },
  { name: "Fonds régionaux", src: "Région IDF", finance: "Mobilités, rénovation énergétique, nature en ville.", deadline: "Dépôt en continu", ref: "Geneviève Gendre", c: "#C0392B" },
  { name: "FCTVA", src: "État", finance: "Récupération de la TVA sur les investissements réalisés.", deadline: "Automatique — versement N+1", ref: "Clément Joly", c: "#2F6BFF" },
  { name: "Fonds européens", src: "UE · via Région", finance: "FEDER / LEADER : projets ruraux, transition, innovation.", deadline: "Programmation 2021–2027", ref: "Gaëlle Cornet", c: "#7A5BD6" },
];

export const FINANCEMENTS_STATS = [
  { value: "1,24 M€", label: "Subventions mobilisées 2026", color: "#1E8E5A" },
  { value: "7", label: "Dossiers de financement actifs", color: "#2F6BFF" },
  { value: "31 janv.", label: "Prochaine échéance (DETR)", color: "#BE8E3C" },
];

// --- Tableau de bord — bandeau KPI -------------------------------------------

export const DASH_KPIS = [
  { value: "14", label: "Projets en cours", note: "+2 ce mois", noteColor: "#1E8E5A", tint: "#EEF3FF", icon: "#2F6BFF" as const, key: "projets" },
  { value: "07", label: "Délibérations à voter", note: "avant le 26/06", noteColor: "#BE8E3C", tint: "#F7F1E3", icon: "#BE8E3C" as const, key: "docs" },
  { value: "89 %", label: "Présence au dernier conseil", note: "+4 pts", noteColor: "#1E8E5A", tint: "#E9F6F0", icon: "#1E8E5A" as const, key: "presence" },
  { value: "03", label: "Messages non lus", note: "2 mentions", noteColor: "#2F6BFF", tint: "#EAEFF6", icon: "#16324F" as const, key: "messages" },
];

export const PROCHAIN_CONSEIL = {
  badge: "J‑7",
  date: "Jeudi 26 juin · 20:00",
  lieu: "Salle Rothschild — Mairie annexe",
  convoques: 27,
  avatars: [
    { ini: "MM", c: "#14304C" },
    { ini: "CJ", c: "#2F6BFF" },
    { ini: "LD", c: "#1E8E5A" },
  ],
};
