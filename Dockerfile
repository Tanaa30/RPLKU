# syntax=docker/dockerfile:1

# ── Stage 1: build ──────────────────────────────────────────
# Uses the pnpm lockfile, so installs are reproducible.
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.34.3 --activate

# Install dependencies first so this layer is cached across builds.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the static site into /app/dist
COPY . .
RUN pnpm build

# ── Stage 2: serve ──────────────────────────────────────────
# Static files only — no npm ci, no dev dependencies.
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
