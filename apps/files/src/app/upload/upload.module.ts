import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadModel, UploadSchema } from './upload.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UploadModel.name,
        schema: UploadSchema,
      },
    ]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
