# Development-focused Dockerfile for server
FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy source code
COPY . .

# Set environment
ENV NODE_ENV=development
ENV DATABASE_URL="file:./dev.db"

# Create user for security
RUN groupadd -r nodejs && useradd -r -g nodejs nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3001

# Start in development mode
CMD ["npm", "run", "start:dev"] 