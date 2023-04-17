import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';

import { getMailConfig } from '../../config/mail.config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { SubscriptionService } from '../subscription/subscription.service';
import { MailModel, MailSchema } from './mail.model';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig()),
    MongooseModule.forFeature([{ name: MailModel.name, schema: MailSchema }]),
  ],
  providers: [MailService, SubscriptionService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
