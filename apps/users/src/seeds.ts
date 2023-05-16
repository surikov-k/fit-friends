#!/usr/bin/env node

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { UserRepository } from './app/user/user.repository';
import { UserEntity } from './app/user/user.entity';
import { Location, UserInterface, UserRole } from '@fit-friends/shared-types';

const seedData: UserInterface[] = [
  {
    _id: '643fec3360e2b4daf9925d5b',
    name: 'Игорь',
    email: 'ronnie.lloyd@example.com',
    passwordHash:
      '$2b$10$GvGg7VNY.NQ1D.T4w.6XDOIoFydEekHHxs8JtL/K4f6gWFRsoNYxK',
    avatar: 'avatar.jpg',
    gender: 'Male',
    role: UserRole.Client,
    location: Location.Petrogradskaya,
  },
  {
    _id: '6432b09839b3c1bee7e8630a',
    name: 'Ангелина',
    email: 'darius.howard@example.com',
    passwordHash:
      '$2b$10$9UUVorInlmsVunb2BpN0v.h3.wuhjKpX7eO4XJoNtZqnEcHXLu5Gq',
    avatar: 'avatar.jpg',
    gender: 'Female',
    birthday: new Date('1980-04-22T00:00:00.000Z'),
    role: UserRole.Coach,
    location: Location.Udelnaya,
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepository = app.get(UserRepository);

  const users = await Promise.all(
    seedData.map(async (data) => {
      const entity = new UserEntity(data);
      return userRepository.upsert(entity);
    })
  );

  console.log(users);
  console.log('🤘 Database filled');

  await app.close();
}

bootstrap();
