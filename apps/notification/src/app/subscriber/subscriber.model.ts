import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { SubscriberInterface } from '@fit-friends/shared-types';
import { SubscriptionModel } from '../subscriptions/subscription.model';

const SUBSCRIBER_COLLECTION_NAME = 'subscribers';

@Schema({
  collection: SUBSCRIBER_COLLECTION_NAME,
  timestamps: true,
})
export class SubscriberModel extends Document implements SubscriberInterface {
  @Prop()
  public email: string;

  @Prop()
  public name: string;

  @Prop()
  public userId: string;

  @Prop()
  public active: boolean;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: SubscriberModel.name,
    },
  ])
  public subscriptions: SubscriptionModel[];
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
