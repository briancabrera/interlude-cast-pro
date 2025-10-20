import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL!);

export type Ctx = { prisma: PrismaClient; redis: Redis; };

export const makeContext = async (): Promise<Ctx> => ({ prisma, redis });
