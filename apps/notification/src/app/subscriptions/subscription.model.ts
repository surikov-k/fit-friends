import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import {
  SubscriptionInterface,
  SubscriptionType,
} from '@fit-friends/shared-types';
import { SubscriberModel } from '../subscriber/subscriber.model';

const SUBSCRIPTION_COLLECTION_NAME = 'subscriptions';

@Schema({
  collection: SUBSCRIPTION_COLLECTION_NAME,
})
export class SubscriptionModel
  extends Document
  implements SubscriptionInterface
{
  @Prop()
  public type: SubscriptionType;

  @Prop()
  public coachId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SubscriberModel.name,
  })
  public subscriber: SubscriberModel;
}

export const SubscriptionSchema =
  SchemaFactory.createForClass(SubscriptionModel);
