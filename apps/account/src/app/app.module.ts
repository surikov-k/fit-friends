import { RmqModule } from '@fit-friends/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnvironment } from './env.validation';
import { ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH } from './app.constants';

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
})
export class AppModule {}
