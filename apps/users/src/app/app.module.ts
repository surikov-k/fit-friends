import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ENV_FILE_PATH } from './app.constants';
import databaseConfig from '../config/database.config';
import { getMongoDbConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync(getMongoDbConfig())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
