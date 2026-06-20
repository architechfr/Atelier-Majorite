// Données institutionnelles — L'Atelier Majorité · Ferrières-en-Brie.
// Uniquement des données structurelles et factuelles : échelons, contacts,
// compétences, financements. Les données opérationnelles (fil, projets,
// messages, agenda) seront alimentées via Firestore au fil des besoins.

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

// --- Mon territoire -----------------------------------------------------------

export const ECHELONS: Record<EchelonId, Echelon> = {
  commune: {
    tier: "COMMUNE",
    accent: "#2F6BFF",
    name: "Ferrières-en-Brie",
    sub: "3 927 à 3 932 habitants · 77164",
    role: "Votre échelon",
    roleDetail: "Conseil municipal — 27 élus, Maire Mireille Munch.",
    comps: [
      "État civil",
      "Urbanisme & PLU",
      "Écoles maternelles & élémentaires",
      "Voirie communale",
      "Police municipale",
      "Culture, sport & associations",
    ],
    contact: "Mireille Munch — Maire",
  },
  interco: {
    tier: "INTERCOMMUNALITÉ",
    accent: "#BE8E3C",
    name: "Marne et Gondoire",
    sub: "Communauté d'agglomération · 20 communes",
    role: "Ferrières y est représentée",
    roleDetail:
      "Mireille Munch, 1ʳᵉ Vice-Présidente · Clément Joly, délégué.",
    comps: [
      "Développement économique",
      "Transports & mobilités",
      "Habitat & PLUi",
      "Eau & assainissement",
      "Collecte des déchets",
      "Tourisme",
    ],
    contact: "Présidence de la CAMG",
  },
  departement: {
    tier: "DÉPARTEMENT",
    accent: "#1E8E5A",
    name: "Seine-et-Marne (77)",
    sub: "Canton d'Ozoir-la-Ferrière",
    role: "Ferrières au Département",
    roleDetail: "Mireille Munch, Conseillère départementale du canton.",
    comps: [
      "Routes départementales",
      "Collèges",
      "Action sociale (RSA, PMI, autonomie)",
      "SDIS — pompiers",
      "Aides aux communes",
    ],
    contact: "Conseil départemental 77",
  },
  region: {
    tier: "RÉGION",
    accent: "#C0392B",
    name: "Île-de-France",
    sub: "Conseil régional",
    role: "Relations régionales",
    roleDetail: "Via la CAMG et les contrats régionaux.",
    comps: [
      "Lycées",
      "Transports — Île-de-France Mobilités",
      "Développement économique",
      "Formation professionnelle",
      "Fonds européens",
    ],
    contact: "Région Île-de-France",
  },
  etat: {
    tier: "ÉTAT",
    accent: "#34495E",
    name: "Préfecture de Seine-et-Marne",
    sub: "Sous-préfecture de Torcy",
    role: "Relation avec l'État",
    roleDetail: "Contrôle de légalité · dotations DETR / DSIL.",
    comps: [
      "Contrôle de légalité des actes",
      "Sécurité & ordre public",
      "Dotations d'investissement (DETR, DSIL)",
      "Organisation des élections",
      "Réglementation & autorisations",
    ],
    contact: "Préfet / Sous-préfet de Torcy",
  },
};

export const ECHELON_PILE: {
  id: EchelonId;
  label: string;
  dot: string;
  sub: string;
}[] = [
  {
    id: "etat",
    label: "ÉTAT",
    dot: "#34495E",
    sub: "Préfecture · Sous-préfecture de Torcy",
  },
  { id: "region", label: "RÉGION", dot: "#C0392B", sub: "Île-de-France" },
  {
    id: "departement",
    label: "DÉPARTEMENT",
    dot: "#1E8E5A",
    sub: "Seine-et-Marne · canton d'Ozoir-la-Ferrière",
  },
  {
    id: "interco",
    label: "INTERCOMMUNALITÉ",
    dot: "#BE8E3C",
    sub: "Marne et Gondoire",
  },
];

export const CONTACTS: Contact[] = [
  {
    role: "Préfet de Seine-et-Marne",
    org: "Préfecture · Melun",
    for: "Contrôle de légalité, sécurité, dotations DETR / DSIL.",
    ref: "Mireille Munch",
    ini: "PR",
    c: "#34495E",
  },
  {
    role: "Sous-préfet de Torcy",
    org: "Sous-préfecture",
    for: "Dossiers locaux, subventions, sécurité de proximité.",
    ref: "Guy Cabanie",
    ini: "SP",
    c: "#34495E",
  },
  {
    role: "Député de la circonscription",
    org: "Assemblée nationale",
    for: "Relais législatif, soutien et portage de projets.",
    ref: "Mireille Munch",
    ini: "AN",
    c: "#2F6BFF",
  },
  {
    role: "Sénateurs de Seine-et-Marne",
    org: "Sénat",
    for: "Représentation des collectivités territoriales.",
    ref: "Mireille Munch",
    ini: "SÉ",
    c: "#7A5BD6",
  },
  {
    role: "Président du Conseil départemental",
    org: "Département 77",
    for: "Routes, collèges, action sociale, aides aux communes.",
    ref: "Mireille Munch",
    ini: "CD",
    c: "#1E8E5A",
  },
  {
    role: "Président de Marne et Gondoire",
    org: "Communauté d'agglo.",
    for: "Compétences intercommunales et mutualisation.",
    ref: "Clément Joly",
    ini: "MG",
    c: "#BE8E3C",
  },
  {
    role: "Présidence Région Île-de-France",
    org: "Région IDF",
    for: "Transports, lycées, fonds régionaux et européens.",
    ref: "Fanny Dezert",
    ini: "RG",
    c: "#C0392B",
  },
  {
    role: "Syndicats (SDESM, eau…)",
    org: "Syndicats intercommunaux",
    for: "Énergie, rénovation, réseaux et mutualisation.",
    ref: "Mickaël Lanchas",
    ini: "SY",
    c: "#16A085",
  },
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
  {
    d: "Écoles & éducation",
    m: { commune: "Maternelle & élémentaire", dept: "Collèges", region: "Lycées" },
  },
  {
    d: "Voirie & routes",
    m: { commune: "Voies communales", dept: "Routes départementales" },
  },
  { d: "Transports", m: { interco: "Bus & navettes", region: "IDF Mobilités" } },
  { d: "Urbanisme", m: { commune: "PLU & permis", interco: "PLUi · SCoT" } },
  { d: "Eau, assainissement, déchets", m: { interco: "Compétence interco" } },
  {
    d: "Action sociale",
    m: { commune: "CCAS", dept: "RSA · PMI · autonomie" },
  },
  {
    d: "Développement économique",
    m: { interco: "Zones d'activités", region: "Aides entreprises" },
  },
  {
    d: "Sécurité",
    m: { commune: "Police municipale", etat: "Gendarmerie · Préfet" },
  },
  {
    d: "Environnement & énergie",
    m: { commune: "Espaces verts", interco: "Déchets", region: "Transition" },
  },
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
  {
    name: "DETR / DSIL",
    src: "État",
    finance: "Investissement structurant : écoles, voirie, bâtiments publics.",
    deadline: "Dépôt avant le 31 janv. 2027",
    ref: "Gaëlle Cornet",
    c: "#34495E",
  },
  {
    name: "Aides départementales",
    src: "Département 77",
    finance: "Équipements de proximité, voirie, aires de jeux.",
    deadline: "Appel à projets — sept. 2026",
    ref: "Gaëlle Cornet",
    c: "#1E8E5A",
  },
  {
    name: "Fonds régionaux",
    src: "Région IDF",
    finance: "Mobilités, rénovation énergétique, nature en ville.",
    deadline: "Dépôt en continu",
    ref: "Geneviève Gendre",
    c: "#C0392B",
  },
  {
    name: "FCTVA",
    src: "État",
    finance: "Récupération de la TVA sur les investissements réalisés.",
    deadline: "Automatique — versement N+1",
    ref: "Clément Joly",
    c: "#2F6BFF",
  },
  {
    name: "Fonds européens",
    src: "UE · via Région",
    finance: "FEDER / LEADER : projets ruraux, transition, innovation.",
    deadline: "Programmation 2021–2027",
    ref: "Gaëlle Cornet",
    c: "#7A5BD6",
  },
];
