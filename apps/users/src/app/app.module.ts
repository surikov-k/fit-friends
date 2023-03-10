import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ENV_FILE_PATH } from './app.constants';
import databaseConfig from '../config/database.config';
import { getMongoDbConfig } from '../config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { validateEnvironments } from './auth/env.validation';
import { jwtOptions } from '../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
