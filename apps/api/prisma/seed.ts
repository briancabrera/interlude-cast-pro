import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { key: 'demo' },
    update: {},
    create: { key: 'demo', name: 'Demo Tenant' }
  });

  const venue = await prisma.venue.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: 'main-hall' } }, // ⬅️ clave compuesta
    update: {},
    create: { slug: 'main-hall', name: 'Main Hall', tenantId: tenant.id }
  });
  
  const now = new Date();
  const in2h = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const in4h = new Date(now.getTime() + 4 * 60 * 60 * 1000);

  await prisma.event.create({
    data: {
      title: 'Opening Night – Live DJ',
      startsAt: in2h,
      endsAt: in4h,
      tenantId: tenant.id,
      venueId: venue.id
    }
  });

  console.log('Seed done.');
}

main().finally(() => prisma.$disconnect());
