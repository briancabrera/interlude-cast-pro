FROM node:20-bookworm-slim
WORKDIR /app

# OpenSSL
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# pnpm 8.6.0
RUN corepack enable && corepack prepare pnpm@8.6.0 --activate

# copiamos TODO el repo (simple) — requiere context en la raíz
COPY . .

# instala SOLO las deps de apps/api usando el lockfile del root
RUN pnpm i --frozen-lockfile --filter ./apps/api...

WORKDIR /app/apps/api
RUN pnpm prisma:gen

EXPOSE 4000
CMD ["pnpm","start"]
