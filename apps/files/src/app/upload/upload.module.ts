import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadModel, UploadSchema } from './upload.model';
import { UploadRepository } from './upload.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { getMulterConfig } from '../config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UploadModel.name,
        schema: UploadSchema,
      },
    ]),
    MulterModule.registerAsync({
      useFactory: getMulterConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, UploadRepository],
})
export class UploadModule {}
