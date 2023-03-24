import { PrismaClient } from '@prisma/workouts-client';
import {
  Gender,
  Skill,
  TimeSpan,
  WorkoutType,
} from '../../../libs/shared-types/src';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.workout.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Energy',
      background: 'background.jpg',
      skill: Skill.Beginner,
      type: WorkoutType.Pilates,
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
      reviews: {
        create: [
          {
            clientId: '641846e23516c5a2e008e22b',
            rating: 5,
            text: 'Спасибо, классная тренировка! Понятная и интересная, с акцентом на правильную технику, как я люблю.',
          },
        ],
      },
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
