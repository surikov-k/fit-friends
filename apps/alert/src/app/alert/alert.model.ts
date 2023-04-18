import { Document, now } from 'mongoose';
import { AlertInterface } from '@fit-friends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const ALERT_COLLECTION_NAME = 'alerts';

@Schema({
  collection: ALERT_COLLECTION_NAME,
  timestamps: true,
})
export class AlertModel extends Document implements AlertInterface {
  @Prop()
  recipientId: string;

  @Prop()
  text: string;

  @Prop({ default: now() })
  createdAt: Date;
}

export const AlertSchema = SchemaFactory.createForClass(AlertModel);
