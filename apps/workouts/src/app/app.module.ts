import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { WorkoutModule } from './workout/workout.module';
import { ENV_FILE_PATH } from './app.constants';
import { validateEnvironment } from './env.validation';
import { jwtOptions } from '../config';

@Module({
  imports: [
    PrismaModule,
    WorkoutModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtOptions],
      validate: validateEnvironment,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
