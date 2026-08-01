# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public issue.
Report it via a private channel:

- Open a [private security advisory](https://github.com/undefined-art/pomodoro/security/advisories/new)
- Or email the maintainers directly

Please include:

- Type of issue (e.g., XSS, injection, auth bypass, etc.)
- Full paths of the affected source file(s)
- Description of the vulnerability and how it can be exploited
- Proof-of-concept or reproduction steps

## Response Times

- **Acknowledgement**: within 48 hours
- **Initial assessment**: within 5 business days
- **Fix released**: as soon as possible after the assessment

## Security Best Practices for This Project

- Secrets (`ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `SESSION_SECRET`)
  must always be supplied via environment variables and never committed.
- The server refuses to start when secrets are missing.
- Keep dependencies up to date and run `npm audit` before releases.
- Run with `NODE_ENV=production` for production deployments.
