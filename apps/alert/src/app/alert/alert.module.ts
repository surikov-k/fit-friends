import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { AlertModel, AlertSchema } from './alert.model';
import { AlertRepository } from './alert.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AlertModel.name, schema: AlertSchema }]),
  ],
  controllers: [AlertController],
  providers: [AlertService, AlertRepository],
})
export class AlertModule {}
