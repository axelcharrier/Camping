# Camping

Front-end de l'application "Camping" (Vue 3 + Vite).

Ce README explique comment installer, configurer et lancer l'application front-end localement, ainsi que comment connecter l'API back-end.

Important
---------
Le dépôt back-end associé : https://github.com/axelcharrier/ApiCamping.git
Cloner et lancer l'API localement (ou déployer l'API) avant d'utiliser le front-end. Le front communique avec l'API via la variable d'environnement `VITE_APP_API_BASE_URL`.

Prérequis
---------
- Node.js (voir `engines` dans `package.json`) — la version recommandée est Node 20+.
- pnpm (recommandé) ou npm/yarn.
- Git pour cloner le dépôt API si besoin.

Installation
------------
1. Cloner ce dépôt :

```bash
git clone <ton-repo-front> && cd Camping
```

2. Installer les dépendances :

```bash
pnpm install
```

3. Cloner et lancer l'API (exemple local) :

```bash
# dans un autre dossier
git clone https://github.com/axelcharrier/ApiCamping.git
cd ApiCamping
# suivre les instructions du README de l'API (installer deps, démarrer le serveur)
```

Configuration (variable d'environnement)
---------------------------------------
Crée un fichier `.env.local` à la racine du projet (non commité) et définis l'URL de base de l'API. Exemple :

```
VITE_APP_API_BASE_URL=http://localhost:3000/
```

- Assure-toi que l'URL se termine par `/` si tu concatènes des chemins côté front.
- Si l'API tourne sur un autre port/hôte, adapte la valeur.

Démarrer l'application (développement)
-------------------------------------
Lancer le serveur de développement Vite :

```bash
pnpm dev
```

Par défaut Vite sert l'application sur `http://localhost:5173` (ou l'URL indiquée dans la sortie de `pnpm dev`).

Build et preview (production)
-----------------------------
Pour construire l'application :

```bash
pnpm build
```

Prévisualiser le build :

```bash
pnpm preview
```

Scripts utiles
--------------
- `pnpm dev` — démarrer le serveur de développement
- `pnpm build` — construire la version de production
- `pnpm preview` — prévisualiser le build
- `pnpm run type-check` — vérification TypeScript (vue-tsc)

Auth / persistance
------------------
- Le front utilise Pinia pour la gestion d'état et le plugin de persistance (localStorage) pour conserver la session.
- Après connexion, le token est stocké dans le store (persisté). Si tu as des problèmes de redirection à la recharge, vérifie la présence du token dans Local Storage (`key: pinia`).

