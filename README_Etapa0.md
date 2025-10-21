# Interlude Cast Pro — Etapa 0: Fundaciones 🚀

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

## 🧾 Scripts disponibles

En la raíz del monorepo:

| Script             | Acción                                       |
|--------------------|----------------------------------------------|
| `pnpm docker:up`   | Levanta todo el stack con Docker             |
| `pnpm docker:down` | Apaga y elimina volúmenes (`-v`)             |
| `pnpm db:migrate`  | Aplica migraciones (`prisma migrate deploy`) |
| `pnpm db:seed`     | Ejecuta semillas iniciales                   |
| `pnpm db:init`     | Ejecuta la primera migracion sin datos y seed|
| `pnpm dev`         | Ejecuta apps en modo dev (Turborepo)         |

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
