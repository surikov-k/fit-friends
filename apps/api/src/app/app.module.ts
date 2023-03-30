import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { validateEnvironment } from './app.env-vaidation';
import { ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH } from './app.constants';
import { WorkoutsModule } from './workouts/workouts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { jwtOptions } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [ENV_FILE_PATH, RABBITMQ_ENV_FILE_PATH],
      isGlobal: true,
      load: [jwtOptions],
      validate: validateEnvironment,
    }),
    OrderModule,
    WorkoutsModule,
    UserModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
