import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriptionModel, SubscriptionSchema } from './subscription.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionModel.name, schema: SubscriptionSchema },
    ]),
  ],
})
export class SubscriptionModule {}
