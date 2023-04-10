import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { RmqModule } from '@fit-friends/core';
import { PrismaModule } from './prisma/prisma.module';
import { WorkoutModule } from './workout/workout.module';
import { ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH } from './app.constants';
import { validateEnvironment } from './env.validation';
import { WorkoutsLogModule } from './workouts-log/workouts-log.module';

@Module({
  imports: [
    PrismaModule,
    WorkoutModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH],
      validate: validateEnvironment,
    }),
    RmqModule,
    WorkoutsLogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
