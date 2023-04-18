import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RmqModule } from '@fit-friends/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH } from './app.constants';
import { validateEnvironment } from './env.validation';
import { databaseConfig, getMongoDbConfig } from '../config';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH],
      validate: validateEnvironment,
      load: [databaseConfig],
    }),
    RmqModule,
    MongooseModule.forRootAsync(getMongoDbConfig()),
    AlertModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
