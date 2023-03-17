import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UploadModule } from './upload/upload.module';
import { ENV_FILE_PATH } from './app.constants';
import { validateEnvironment } from './upload/env.validation';
import {
  getMongoDbConfig,
  getServeStaticConfig,
  mongoDbOptions,
  multerEnvOptions,
} from '../../config';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mongoDbOptions, multerEnvOptions],
      validate: validateEnvironment,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    ServeStaticModule.forRootAsync(getServeStaticConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
