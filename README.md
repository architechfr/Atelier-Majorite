# L'Atelier Majorité — Cockpit des élus

**Échanger · Coopérer · Agir** — Ferrières Passionnément.

Application web (PWA) interne pour les élus de la majorité de Ferrières-en-Brie.
Installable sur mobile et ordinateur, elle réunit l'essentiel du pilotage de la
vie municipale.

## Fonctionnalités (V1)

- **Tableau de bord** — vue d'ensemble : signalements à traiter, prochains
  rendez-vous, dernières publications.
- **Actualités & projets** — rédaction, brouillons et publication.
- **Agenda** — conseils, permanences, commissions, événements et réunions,
  regroupés par jour.
- **Signalements citoyens** — suivi des demandes des habitants (statut,
  priorité, catégorie, élu référent).
- **Élus & contacts** — trombinoscope, coordonnées et permanences.
- **Connexion** réservée aux élus (code d'accès partagé pour la démo).

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production (dossier dist/)
npm run preview  # prévisualiser le build
```

**Code d'accès de démonstration :** `ferrieres2026`

## Pile technique

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- React Router 7
- PWA (vite-plugin-pwa) — installable, fonctionne hors-ligne
- lucide-react (icônes)

## Architecture des données

Pour la démo, les données sont stockées **localement dans le navigateur**
(`localStorage`) via une couche d'accès unique : [`src/lib/store.ts`](src/lib/store.ts).
Les données de départ sont dans [`src/lib/seed.ts`](src/lib/seed.ts).

### Passer à des données réellement partagées (Supabase)

Tout est prêt pour brancher une vraie base. Les modèles
([`src/lib/types.ts`](src/lib/types.ts)) correspondent aux futures tables.
Pour migrer :

1. Créer un projet Supabase (gratuit) et les tables `actualites`,
   `evenements`, `signalements`, `elus`.
2. Remplacer les fonctions de lecture/écriture de `src/lib/store.ts` par des
   appels au client Supabase (`@supabase/supabase-js`). **L'interface des
   composants ne change pas.**
3. Remplacer l'auth de démo ([`src/lib/auth.tsx`](src/lib/auth.tsx)) par
   Supabase Auth (e-mail + mot de passe par élu).
4. Ajouter le stockage des photos pour les signalements (Supabase Storage).

## Déploiement

Le projet se déploie tel quel sur **Vercel** (build `npm run build`, sortie
`dist/`). Aucune configuration serveur requise tant que les données restent
locales.

## Structure

```
src/
  lib/        types, store (données), auth, formatage
  components/ Layout (navigation), kit UI réutilisable
  pages/      Dashboard, Actualités, Agenda, Signalements, Élus, Login
```
