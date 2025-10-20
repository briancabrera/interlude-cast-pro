FROM node:20-alpine
WORKDIR /app

# pnpm 8.6.0
RUN corepack enable && corepack prepare pnpm@8.6.0 --activate

# copiamos TODO el repo (simple) — requiere context en la raíz
COPY . .

# instala SOLO las deps de apps/api usando el lockfile del root
RUN pnpm i --frozen-lockfile --filter ./apps/api...

WORKDIR /app/apps/api
RUN pnpm build

EXPOSE 4000
CMD ["pnpm","start"]
