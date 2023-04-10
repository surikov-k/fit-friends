import { PrismaClient } from '@prisma/gyms-client';
import { GymFeature, Location } from '../../../libs/shared-types/src';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.gym.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'World sport',
      location: Location.Petrogradskaya,
      isVerified: true,
      features: [
        GymFeature.Massage,
        GymFeature.KidsRoom,
        GymFeature.FreeParking,
        GymFeature.SwimmingPool,
      ],
      photos: ['world-sport-photo-1', 'world-sport-photo-2'],
      description:
        'Огромный зал с отдельной зоной кроссфит. Разнообразное оборудование для занятий практически любым видом спорта.\n Фитнес-клуб World Sport предоставляет полный комплекс фитнес-программ, бассейны, групповой и индивидуальный тренинг, тренажерные залы, детские комнаты, 3 вида саун, SPA салоны.',
      price: 500,
    },
  });

  await prisma.gym.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Reforma',
      location: Location.Pionerskaya,
      isVerified: true,
      features: [GymFeature.Massage, GymFeature.KidsRoom],
      photos: ['reforma-photo-1', 'reforma-photo-2'],
      description:
        'Более 200 современных тренажеров, множество дополнительных фитнес-услуг и лучшие тренеры Санкт-Петербурга.',
      price: 600,
    },
  });

  await prisma.gym.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Fitstar',
      location: Location.Sportivnaya,
      isVerified: false,
      features: [GymFeature.FreeParking, GymFeature.SwimmingPool],
      photos: ['fitstar-photo-1', 'fitstart-photo-2'],
      description:
        'Комплекс площадью более 1200 м2, 20 зон для проведения разнообразных групповых и индивидуальных тренировок.',
      price: 1000,
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
