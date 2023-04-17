import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { SubscriberInterface } from '@fit-friends/shared-types';

const SUBSCRIBER_COLLECTION_NAME = 'subscribers';

@Schema({
  collection: SUBSCRIBER_COLLECTION_NAME,
  timestamps: true,
})
export class SubscriptionModel extends Document implements SubscriberInterface {
  @Prop()
  public email: string;

  @Prop()
  public name: string;

  @Prop()
  public clientId: string;

  @Prop()
  public active: boolean;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriptionModel);
