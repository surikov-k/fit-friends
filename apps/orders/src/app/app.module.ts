import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { ENV_FILE_PATH } from '../../app.constants';
import { jwtOptions } from '../../config';
import { validateEnvironment } from '../../env.validatioin';

@Module({
  imports: [
    OrderModule,
    PrismaModule,
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
