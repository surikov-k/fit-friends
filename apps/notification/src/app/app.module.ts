import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { RmqModule } from '@fit-friends/core';
import { validateEnvironment } from './env.validation';
import { ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH } from './app.constants';
import { databaseConfig, getMongoDbConfig } from '../config';
import { SubscriptionModule } from './subscription/subscription.module';
import { MailModule } from './mail/mail.module';

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
    SubscriptionModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
