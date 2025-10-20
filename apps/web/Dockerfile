FROM node:20-alpine
WORKDIR /app

# pnpm 8.6.0
RUN corepack enable && corepack prepare pnpm@8.6.0 --activate

# copiamos TODO el repo (simple) — requiere context en la raíz
COPY . .

# instala SOLO las deps de apps/web usando el lockfile del root
RUN pnpm i --frozen-lockfile --filter ./apps/web...

WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm","dev","--host","0.0.0.0","--port","3000"]
