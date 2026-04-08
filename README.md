# adonis-react-starter

Monorepo production-ready — AdonisJS v7 + React 19 + Vite + TypeScript.  
Auth JWT via access tokens, structure feature-based, Docker Compose inclus.

```
apps/
├── api/      → AdonisJS v7 (REST API, auth, PostgreSQL)
└── client/   → React 19 + Vite + Tanstack Query + Zustand
```

---

## Stack

| Côté | Technologie |
|------|-------------|
| Backend | AdonisJS v7, Lucid ORM, VineJS |
| Auth | Access Tokens (`@adonisjs/auth`) |
| Frontend | React 19, Vite, TypeScript |
| State serveur | Tanstack Query |
| State client | Zustand (persist) |
| Base de données | PostgreSQL 16 |
| Infra dev | Docker Compose |

---

## Démarrage rapide

### Prérequis

- [Docker](https://www.docker.com/) + Docker Compose
- Node.js 22+

### 1. Cloner le repo

```bash
git clone https://github.com/ton-user/adonis-react-starter.git
cd adonis-react-starter
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/client/.env.example apps/client/.env
```

Remplir les valeurs manquantes dans `apps/api/.env` :

```bash
# Dans apps/api/
node ace generate:key   # → APP_KEY
```

### 3. Lancer avec Docker

```bash
docker compose up --build
```

| Service | URL |
|---------|-----|
| API | http://localhost:3333 |
| Frontend | http://localhost:5173 |
| PostgreSQL | localhost:5432 |

### 4. Lancer les migrations

```bash
docker compose exec api node ace migration:run
```

---

## Sans Docker (dev local)

```bash
# API
cd apps/api
npm install
node ace migration:run
node ace serve --hmr

# Client (autre terminal)
cd apps/client
npm install
npm run dev
```

> Assure-toi d'avoir PostgreSQL en local et que `DB_HOST=localhost` dans `apps/api/.env`.

---

## Structure du projet

```
apps/
├── api/
│   ├── app/
│   │   ├── controllers/       # Un controller par ressource
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── transformers/      # Sérialisation des réponses (AdonisJS v7)
│   │   └── validators/        # VineJS
│   ├── database/
│   │   └── migrations/
│   ├── start/
│   │   └── routes/            # Routes organisées par domaine
│   └── config/
│
└── client/
    └── src/
        ├── features/          # Feature-based structure
        │   └── auth/
        │       ├── components/
        │       ├── hooks/     # useLogin, useSignup, useLogout
        │       ├── services/  # Appels API
        │       ├── store/     # Zustand store (persist)
        │       └── types/
        ├── pages/             # Pages top-level
        ├── shared/            # Composants et hooks réutilisables
        └── lib/
            └── http/          # Wrapper fetch (style Axios, sans Axios)
```

---

## Wrapper fetch

Le client HTTP est un wrapper `fetch` typé qui reproduit l'API d'Axios sans la dépendance.

```typescript
import { http } from '@/lib/http'

// GET
const { data } = await http.get<User[]>('/api/v1/users')

// POST
const { data } = await http.post<User>('/api/v1/users', { name: 'Lucas' })

// Avec query params
const { data } = await http.get('/api/v1/posts', {
  params: { page: '1', limit: '10' }
})

// Sans auth (login, signup)
const { data } = await http.post('/api/v1/auth/login', payload, {
  withAuth: false
})
```

Le token Bearer est attaché automatiquement. Sur 401, le token est supprimé et `onUnauthorized` est appelé (configuré dans `main.tsx`).

---

## Ajouter une feature

```bash
# Créer la structure
mkdir -p apps/client/src/features/ma-feature/{components,hooks,services,types}

# Créer le barrel export
touch apps/client/src/features/ma-feature/index.ts
```

Pattern à suivre :

```
ma-feature/
├── components/     # Composants React spécifiques à la feature
├── hooks/          # useQuery / useMutation Tanstack Query
├── services/       # Appels API via http
├── types/          # Types TypeScript
└── index.ts        # Barrel export
```

---

## Variables d'environnement

### Racine (Docker Compose)

| Variable | Description | Défaut |
|----------|-------------|--------|
| `DB_USER` | Utilisateur PostgreSQL | `starter` |
| `DB_PASSWORD` | Mot de passe PostgreSQL | `secret` |
| `DB_DATABASE` | Nom de la base | `starter_dev` |

### `apps/api/.env`

| Variable | Description |
|----------|-------------|
| `APP_KEY` | Clé de chiffrement Adonis (`node ace generate:key`) |
| `DB_HOST` | Host PostgreSQL (`localhost` ou `postgres` avec Docker) |
| `DB_PORT` | Port PostgreSQL |
| `DB_USER` | Utilisateur |
| `DB_PASSWORD` | Mot de passe |
| `DB_DATABASE` | Nom de la base |
| `CORS_ORIGIN` | URL du frontend autorisée |

### `apps/client/.env`

| Variable | Description | Défaut |
|----------|-------------|--------|
| `VITE_API_URL` | URL de l'API | `http://localhost:3333` |

---

## License

MIT