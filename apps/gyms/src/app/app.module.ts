import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RmqModule } from '@fit-friends/core';
import { ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH } from './app.constants';
import { validateEnvironment } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH],
      validate: validateEnvironment,
    }),
    RmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
