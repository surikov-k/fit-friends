import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  SubscriptionInterface,
  SubscriptionType,
} from '@fit-friends/shared-types';

const SUBSCRIBER_COLLECTION_NAME = 'subscribers';

@Schema({
  collection: SUBSCRIBER_COLLECTION_NAME,
  timestamps: true,
})
export class SubscriptionModel
  extends Document
  implements SubscriptionInterface
{
  @Prop()
  email: string;

  @Prop()
  clientName: string;

  @Prop()
  coachName: string;

  @Prop()
  public type: SubscriptionType;

  @Prop()
  public clientId: string;

  @Prop()
  public coachId: string;
}

export const SubscriptionSchema =
  SchemaFactory.createForClass(SubscriptionModel);
