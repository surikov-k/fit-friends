import { PrismaClient } from '@prisma/orders-client';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PaymentMethod, PurchaseType } from '../../../libs/shared-types/src';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.order.upsert({
    where: { id: 1 },
    update: {},
    create: {
      purchaseType: PurchaseType.Workout,
      userId: '64131f325d6cbe769dc46ebd',
      serviceId: 6,
      price: 1200,
      quantity: 2,
      total: 2400,
      payment: PaymentMethod.Visa,
    },
  });

  console.log('🤘 Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
