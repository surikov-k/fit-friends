/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RmqService } from '@fit-friends/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Nutrition microservice');
  const app = await NestFactory.create(AppModule, { logger });
  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get<ConfigService>(ConfigService);
  const queue = configService.get('RABBITMQ_NUTRITION_SERVICE_QUEUE');

  app.connectMicroservice(rmqService.getOptions(queue));
  await app.startAllMicroservices();

  Logger.log(`🚀 Nutrition microservice is started`);
}

bootstrap();
