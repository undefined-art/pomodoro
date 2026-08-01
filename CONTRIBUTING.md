# Contributing to Tempo Pomodoro

Thank you for your interest in contributing! Please read this document before
opening issues or pull requests.

## Code of Conduct

This project adheres to the [Contributor Covenant](./CODE_OF_CONDUCT.md).

## How to Contribute

1. **Fork** the repository and create your branch from `main`.
2. **Install dependencies**:
   - Server: `cd server && npm install`
   - Client: `cd client && pnpm install`
3. **Set up the database**:
   ```bash
   cd server
   cp env.example .env
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```
4. **Make your changes**, keeping them backward-compatible.
5. **Verify everything passes**:
   ```bash
   cd server && npm run build && npm run test
   cd client && pnpm build
   ```
6. Commit with a clear, conventional message and open a pull request.

## Commit Message Guidelines

Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.

## Pull Request Checklist

- [ ] Changes are backward-compatible
- [ ] Tests added/updated and passing
- [ ] Server builds (`npm run build`)
- [ ] Client builds (`pnpm build`)
- [ ] No hardcoded secrets introduced
- [ ] PR description explains the change and references related issues

## Security

If you find a security vulnerability, **do not** open a public issue. Follow
[SECURITY.md](./SECURITY.md).
