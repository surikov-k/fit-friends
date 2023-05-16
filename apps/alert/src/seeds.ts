import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AlertRepository } from './app/alert/alert.repository';
import { AlertEntity } from './app/alert/alert.entity';
import { AlertInterface } from '@fit-friends/shared-types';

const seedData: AlertInterface[] = [
  {
    recipientId: '643fec3360e2b4daf9925d5b',
    text: 'Cotton candy ice cream apple pie sesame',
  },
  {
    recipientId: '643fec3360e2b4daf9925d5b',
    text: 'Cookie chocolate jelly-o caramels',
  },
  {
    recipientId: '643fec3360e2b4daf9925d5b',
    text: 'Gummi bears marzipan bear claw powder',
  },
  {
    recipientId: '6432b09839b3c1bee7e8630a',
    text: 'Bonbon chocolate bar sweet cake',
  },
  {
    recipientId: '6432b09839b3c1bee7e8630a',
    text: 'Soufflé muffin candy canes sweet',
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const alertRepository = app.get(AlertRepository);

  const alerts = await Promise.all(
    seedData.map(async (data) => {
      const entity = new AlertEntity(data);
      return alertRepository.create(entity);
    })
  );

  console.log(alerts);
  console.log('🤘 Database filled');

  await app.close();
}

bootstrap();
