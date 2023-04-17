import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriptionModel, SubscriberSchema } from './subscription.model';
import { SubscriptionController } from './subscription.controller';
import { SubscriberService } from './subscriber.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionModel.name, schema: SubscriberSchema },
    ]),
    MailModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriberService],
})
export class SubscriptionModule {}
