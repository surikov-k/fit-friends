import { PrismaClient } from '@prisma/client';
import {
  Gender,
  Skill,
  TimeSpan,
  Training,
} from '../../../libs/shared-types/src';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.workout.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Energy',
      skill: Skill.Beginner,
      type: Training.Pilates,
      price: 800,
      calories: 320,
      description:
        'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
      gender: Gender.Common,
      video: 'video.mp4',
      rating: 0,
      coachId: '6411b0cf332c6121f8682a0f',
      isSpecialOffer: false,
      duration: TimeSpan.Short,
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
