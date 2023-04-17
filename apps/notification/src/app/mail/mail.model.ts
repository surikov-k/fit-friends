import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { MailInterface, MailStatus } from '@fit-friends/shared-types';

const MAILS_COLLECTION_NAME = 'mail';

@Schema({
  collection: MAILS_COLLECTION_NAME,
  timestamps: true,
})
export class MailModel extends Document implements MailInterface {
  @Prop()
  to: string;

  @Prop()
  subject: string;

  @Prop()
  template: string;

  @Prop()
  context?: object;

  @Prop()
  status: MailStatus;
}

export const MailSchema = SchemaFactory.createForClass(MailModel);
