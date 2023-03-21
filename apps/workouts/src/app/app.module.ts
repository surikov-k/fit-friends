import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { WorkoutModule } from './workout/workout.module';
import { ENV_FILE_PATH } from './app.constants';
import { validateEnvironment } from './env.validation';

@Module({
  imports: [
    PrismaModule,
    WorkoutModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      validate: validateEnvironment,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
