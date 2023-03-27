import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { jwtOptions } from '../../config';
import { validateEnvironment } from './env.validatioin';
import { ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH } from './app.constants';
import { RmqModule } from '@fit-friends/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH],
      load: [jwtOptions],
      validate: validateEnvironment,
    }),
    OrderModule,
    PrismaModule,
    RmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
