import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { AlertModel, AlertSchema } from './alert.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AlertModel.name, schema: AlertSchema }]),
  ],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
