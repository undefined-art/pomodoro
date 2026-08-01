# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Health check endpoint (`GET /api/v1/health`) with uptime and timestamp.
- GitHub Actions CI pipeline that builds and tests the server and client.
- Legal and governance files: `LICENSE`, `NOTICE`, `CODE_OF_CONDUCT.md`,
  `SECURITY.md`, `SUPPORT.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, issue templates,
  and pull request template.
- `client/.env.example` documenting client environment variables.
- Expanded unit tests for the tasks service, users service, tasks controller,
  and app health endpoint (Jest, 24 tests).

### Changed
- Server Dockerfile is now a production multi-stage build (build + run with
  `node dist/main.js` instead of the development watch server).
- Client Dockerfile serves the production bundle via `vite preview`.
- Docker Compose no longer contains hardcoded secrets; they must be supplied
  via environment variables.
- Removed unused dependencies (`sqlite3`, `typeorm`, `@nestjs/typeorm`, `csurf`)
  which failed to build on modern Node versions.

### Fixed
- Removed a `console.log` that exposed the JWT access secret at runtime.
- The server no longer falls back to insecure hardcoded secrets; it refuses to
  start when `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, or `SESSION_SECRET`
  are missing.
- Jest now resolves `src/...` imports correctly and tests run under Node 20.
- Corrected the client `packageManager` field to `pnpm`, matching the lockfile.

### Security
- Secrets are validated at startup and required from the environment.
