import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development','production','test']).default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string()
});

export const cfg = schema.parse(process.env);
