import { useSyncExternalStore } from "react";
import type { Actualite, Elu, Evenement, Signalement } from "./types";
import { ACTUALITES, ELUS, EVENEMENTS, SIGNALEMENTS } from "./seed";

// Couche de données locale (localStorage) avec API simple et réactive.
// Pour brancher Supabase plus tard : remplacer les fonctions read/write par
// des appels au client supabase, l'interface des composants ne change pas.

interface DB {
  actualites: Actualite[];
  evenements: Evenement[];
  signalements: Signalement[];
  elus: Elu[];
}

const KEY = "fp-db-v1";

function seed(): DB {
  return {
    actualites: ACTUALITES,
    evenements: EVENEMENTS,
    signalements: SIGNALEMENTS,
    elus: ELUS,
  };
}

function load(): DB {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    return JSON.parse(raw) as DB;
  } catch {
    return seed();
  }
}

let db: DB = load();
const listeners = new Set<() => void>();

function persist() {
  localStorage.setItem(KEY, JSON.stringify(db));
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function resetDb() {
  db = seed();
  persist();
}

export const uid = () =>
  `${Date.now().toString(36)}-${Math.floor(performance.now() * 1000).toString(36)}`;

// --- Hooks de lecture ---------------------------------------------------------

function useSlice<T>(selector: (db: DB) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(db),
    () => selector(db),
  );
}

export const useActualites = () => useSlice((d) => d.actualites);
export const useEvenements = () => useSlice((d) => d.evenements);
export const useSignalements = () => useSlice((d) => d.signalements);
export const useElus = () => useSlice((d) => d.elus);

export const getElu = (id?: string) =>
  id ? db.elus.find((e) => e.id === id) : undefined;

// --- Actualités ---------------------------------------------------------------

export function upsertActualite(a: Actualite) {
  const i = db.actualites.findIndex((x) => x.id === a.id);
  db.actualites =
    i >= 0
      ? db.actualites.map((x) => (x.id === a.id ? a : x))
      : [a, ...db.actualites];
  persist();
}

export function deleteActualite(id: string) {
  db.actualites = db.actualites.filter((a) => a.id !== id);
  persist();
}

// --- Événements ---------------------------------------------------------------

export function upsertEvenement(e: Evenement) {
  const i = db.evenements.findIndex((x) => x.id === e.id);
  db.evenements =
    i >= 0
      ? db.evenements.map((x) => (x.id === e.id ? e : x))
      : [...db.evenements, e];
  persist();
}

export function deleteEvenement(id: string) {
  db.evenements = db.evenements.filter((e) => e.id !== id);
  persist();
}

// --- Signalements -------------------------------------------------------------

export function upsertSignalement(s: Signalement) {
  const i = db.signalements.findIndex((x) => x.id === s.id);
  db.signalements =
    i >= 0
      ? db.signalements.map((x) => (x.id === s.id ? s : x))
      : [s, ...db.signalements];
  persist();
}

export function deleteSignalement(id: string) {
  db.signalements = db.signalements.filter((s) => s.id !== id);
  persist();
}
