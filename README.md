# Tempo Pomodoro

A modern Pomodoro productivity timer built with **SolidJS**, **NestJS**, and **Prisma**.

[![CI](https://github.com/undefined-art/pomodoro/actions/workflows/ci.yml/badge.svg)](https://github.com/undefined-art/pomodoro/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Tempo helps you achieve laser focus and conquer your to-do list using the
Pomodoro technique. Plan projects, track tasks, and run focus sessions with a
clean, fast UI.

## Features

- **Pomodoro timer** with task tracking and session counters.
- **Projects & tasks** management (create, update, complete, estimate pomodoros).
- **User accounts**: registration, login, refresh tokens, and session management.
- **JWT authentication** (access + refresh tokens) with bcrypt hashing.
- **Input validation** via `class-validator` on every DTO.
- **Rate limiting** via `@nestjs/throttler`.
- **Structured error handling**: global exception filter, response and timeout interceptors.
- **Health check endpoint** for liveness probes.
- **Dockerized deployment** with Nginx reverse proxy and Compose orchestration.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | SolidJS, Vite, Tailwind CSS, @solidjs/router, @modular-forms/solid |
| Backend | NestJS, Prisma ORM, JWT, class-validator, @nestjs/throttler |
| Database | SQLite (dev) / PostgreSQL (production, via Prisma) |
| Infra | Docker, Docker Compose, Nginx, GitHub Actions |

## Architecture

```
pomodoro/
├── server/                 # NestJS API
│   ├── prisma/             # Schema, migrations, seed
│   └── src/
│       ├── auth/           # Authentication (controller, service, DTOs)
│       ├── users/          # User management
│       ├── tasks/          # Task CRUD
│       ├── projects/       # Project CRUD
│       ├── guards/         # JWT auth guard
│       ├── interceptors/   # Response / timeout interceptors
│       ├── global-filters/ # Global exception filter
│       └── config/         # Environment configuration
├── client/                 # SolidJS + Vite frontend
│   └── src/
│       ├── pages/          # Home, tasks, auth (login/register), error
│       ├── components/     # Header, task form, clock, etc.
│       └── hooks/          # useRequest (API client)
├── .github/workflows/      # CI pipeline
├── docker-compose.yml      # Server + client + Nginx
└── deploy.sh               # Deployment helper
```

## Getting Started

### Prerequisites

- Node.js 18+ (20 recommended)
- npm (server) and pnpm (client)
- Docker + Docker Compose (optional, for containerized runs)

### Installation

```bash
git clone git@github.com:undefined-art/pomodoro.git
cd pomodoro

# Server
cd server
npm install
cp env.example .env        # then fill in the secret values

# Client
cd ../client
pnpm install
cp .env.example .env       # optional
```

### Database

```bash
cd server
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### Run (development)

```bash
cd server && npm run start:dev   # API on http://localhost:3001
cd client && pnpm dev            # App on http://localhost:5173
```

### Run (production)

```bash
cd server && npm run build && npm run start:prod
cd client && pnpm build && pnpm serve
```

## Environment Variables

### Server (`server/.env`)

| Variable | Description | Required |
| --- | --- | --- |
| `PORT` | HTTP port | `3001` default |
| `NODE_ENV` | `development` / `production` | no |
| `DATABASE_URL` | Prisma connection string | yes |
| `ACCESS_TOKEN_SECRET` | JWT access token secret | **yes** |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret | **yes** |
| `SESSION_SECRET` | Express session secret | **yes** |
| `CORS_ORIGIN` | Comma-separated allowed origins | no |
| `THROTTLE_TTL` | Rate limit window (seconds) | `60` default |
| `THROTTLE_LIMIT` | Max requests per window | `100` default |

> The server **refuses to start** if any required secret is missing.

### Client (`client/.env`)

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL of the API (e.g. `http://localhost:3001/api/v1`) |
| `VITE_APP_NAME` | App display name |
| `VITE_APP_VERSION` | App version string |

## API Overview

All endpoints are prefixed with `/api/v1`.

### Authentication

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/v1/auth/local/register` | Register a new user |
| `POST` | `/api/v1/auth/local/login` | Log in |
| `POST` | `/api/v1/auth/refresh-token` | Refresh tokens |

### Tasks (`/api/v1/tasks`, requires auth)

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/v1/tasks` | Create a task |
| `GET` | `/api/v1/tasks` | List all tasks |
| `GET` | `/api/v1/tasks/project/:id` | Tasks for a project |
| `GET` | `/api/v1/tasks/:id` | Get a task |
| `PUT` | `/api/v1/tasks/:id` | Update a task |
| `DELETE` | `/api/v1/tasks/:id` | Delete a task |

### Health

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/health` | Liveness probe |

## Testing

```bash
cd server
npm run test        # Unit tests (24 tests, Jest)
npm run test:cov    # Coverage report
npm run test:e2e    # End-to-end tests
```

## Docker

```bash
# Prepare environment
cp .env.example .env   # fill in the three required secrets

# Build and start all services (server, client, nginx)
docker-compose up -d --build

# View logs
docker-compose logs -f
```

- Frontend: http://localhost:5173
- API: http://localhost:3001
- Nginx (production): http://localhost

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Security

See [SECURITY.md](./SECURITY.md) for reporting guidelines.

## License

MIT — see [LICENSE](./LICENSE). Third-party attributions in [NOTICE](./NOTICE).
