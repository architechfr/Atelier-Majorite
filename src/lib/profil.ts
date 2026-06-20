import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "./firebase";

// Profil Firestore de chaque élu — complète les données publiques de seed.ts
// avec les coordonnées personnelles (tel, email de contact).
// Lecture : tout élu connecté. Écriture : propriétaire seulement (règles Firestore).

export interface Profil {
  displayName: string; // "Florian Clarisse"
  eluId?: string;      // ref vers ELUS[].id — établie à l'enregistrement
  tel?: string;
  emailContact?: string;
}

export async function getProfil(uid: string): Promise<Profil | null> {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, "profils", uid));
    return snap.exists() ? (snap.data() as Profil) : null;
  } catch {
    return null;
  }
}

export async function saveProfil(
  uid: string,
  data: Partial<Profil>,
): Promise<void> {
  if (!db) return;
  await setDoc(doc(db, "profils", uid), data, { merge: true });
}

export async function getAllProfils(): Promise<Record<string, Profil>> {
  if (!db) return {};
  try {
    const snap = await getDocs(collection(db, "profils"));
    const result: Record<string, Profil> = {};
    snap.forEach((d) => {
      result[d.id] = d.data() as Profil;
    });
    return result;
  } catch {
    return {};
  }
}
