# Interlude Cast Pro — Etapa 0: Fundaciones 🚀

## 🎯 Objetivo
Levantar el esqueleto del sistema con experiencia de desarrollo **turn-key**, validando:
- Monorepo con `apps/api` (Node.js + Apollo GraphQL) y `apps/web` (React + Apollo Client).
- Docker Compose con `api`, `web`, `mysql`, `redis`.
- Migraciones y `seed` iniciales.
- Config centralizada `.env` + logger básico.
- Healthcheck en `GET /health`.

---

## ✅ Requisitos
- **Node.js 20+**
- **PNPM 8**
- **Docker + Docker Compose**
- (Opcional) **curl** para probar el healthcheck

---

## 🔐 Variables de entorno

Copia el ejemplo y ajusta si es necesario:

```bash
cp .env.example .env
```

Valores por defecto en `.env.example` (dev):

```
# API
PORT=4000
NODE_ENV=development

# DB
DATABASE_URL="mysql://icp:icp@mysql:3306/icp"

# Redis
REDIS_URL="redis://redis:6379"

# Web
VITE_API_URL="http://localhost:4000/graphql"
```

---

## 🧩 Instalación

Instalá dependencias del monorepo:

```bash
pnpm install
```

---

## 🐳 Levantar todo con Docker (turn-key)

Este comando construye imágenes y levanta `mysql`, `redis`, `api` y `web`:

```bash
pnpm docker:up
```

Puertos expuestos:

| Servicio | URL/puerto                          | Descripción                        |
|---------:|-------------------------------------|------------------------------------|
| API      | http://localhost:4000 (GraphQL)     | Apollo GraphQL + Healthcheck       |
| Web      | http://localhost:3000               | React + Apollo Client              |
| MySQL    | 3306                                | Base de datos                      |
| Redis    | 6379                                | Cache / pubsub (preparado)         |

> El servicio `api` espera a que MySQL esté “healthy” antes de iniciar.

---

## 🗃️ Migraciones y Seed

Con los contenedores arriba:

```bash
pnpm db:migrate
pnpm db:seed
```

Esto crea tablas (`Tenant`, `Venue`, `Event`) e inserta datos de ejemplo:
- **Tenant:** `demo`
- **Venue:** `main-hall`
- **Event:** `Opening Night – Live DJ`

---

## 🩺 Healthcheck

Probá el endpoint de salud:

```bash
curl http://localhost:4000/health
```

Respuesta esperada:

```json
{ "ok": true }
```

---

## 🧠 Desarrollo local (sin Docker, opcional)

Si preferís correr cada app fuera de Docker:

```bash
# Terminal 1: API
pnpm --filter api dev

# Terminal 2: Web
pnpm --filter web dev
```

Asegurate de tener un MySQL local o de mantener `mysql` por Docker y ajustar `DATABASE_URL` si corresponde.

---

## 🧾 Scripts disponibles

En la raíz del monorepo:

| Script             | Acción                                       |
|--------------------|----------------------------------------------|
| `pnpm docker:up`   | Levanta todo el stack con Docker             |
| `pnpm docker:down` | Apaga y elimina volúmenes (`-v`)             |
| `pnpm db:migrate`  | Aplica migraciones (`prisma migrate deploy`) |
| `pnpm db:seed`     | Ejecuta semillas iniciales                   |
| `pnpm dev`         | Ejecuta apps en modo dev (Turborepo)         |

---

## 🧭 Criterios de aceptación (checklist)

- [x] `docker compose up` deja **API en :4000** y **Web en :3000**
- [x] `pnpm db:migrate` y `pnpm db:seed` crean datos de ejemplo
- [x] `GET /health` responde `{ ok: true }`
- [x] `.env` centralizado y `pino` como logger básico
- [x] README con pasos claros para setup y ejecución

---

## 🛠️ Troubleshooting

- **La API no conecta a MySQL**  
  Asegurate de usar `pnpm docker:up` (incluye healthcheck). Si persistió un estado roto:
  ```bash
  pnpm docker:down
  pnpm docker:up
  ```

- **La Web no muestra datos**  
  Verificá `VITE_API_URL` en `.env` y que `http://localhost:4000/graphql` responda.

- **Migraciones no aplican**  
  Confirmá que los contenedores estén arriba y corré:
  ```bash
  pnpm db:migrate
  pnpm db:seed
  ```

---
