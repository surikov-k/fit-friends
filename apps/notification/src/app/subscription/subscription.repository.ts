import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { SubscriberInterface } from '@fit-friends/shared-types';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionModel } from './subscription.model';

@Injectable()
export class SubscriptionRepository
  implements
    CrudRepositoryInterface<SubscriptionEntity, string, SubscriberInterface>
{
  constructor(
    @InjectModel(SubscriptionModel.name)
    private readonly subscriberModel: Model<SubscriptionModel>
  ) {}

  public async create(item: SubscriptionEntity): Promise<SubscriberInterface> {
    const subscriber = new this.subscriberModel(item);
    return subscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.subscriberModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<SubscriberInterface | null> {
    return this.subscriberModel
      .findOne({ id })
      .populate('subscriptions')
      .exec();
  }

  public async findByEmail(email: string): Promise<SubscriberInterface | null> {
    return this.subscriberModel
      .findOne({ email })
      .populate('subscriptions')
      .exec();
  }

  public async update(
    id: string,
    item: SubscriptionEntity
  ): Promise<SubscriberInterface> {
    return this.subscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
