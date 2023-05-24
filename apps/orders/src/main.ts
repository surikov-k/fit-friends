/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { RmqService } from '@fit-friends/core';

async function bootstrap() {
  const logger = new Logger('Orders microservice');
  const app = await NestFactory.create(AppModule, { logger });
  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get<ConfigService>(ConfigService);
  const queue = configService.get('RABBITMQ_ORDERS_SERVICE_QUEUE');

  app.connectMicroservice(rmqService.getOptions(queue));
  await app.startAllMicroservices();

  Logger.log(`🚀 Microservices started`);
}

bootstrap();
