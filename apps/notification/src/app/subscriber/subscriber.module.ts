import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriberModel, SubscriberSchema } from './subscriber.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriberModel.name, schema: SubscriberSchema },
    ]),
  ],
})
export class SubscriberModule {}
