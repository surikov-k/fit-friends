import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { SubscriberInterface } from '@fit-friends/shared-types';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberModel } from './subscriber.model';

@Injectable()
export class SubscriberRepository
  implements
    CrudRepositoryInterface<SubscriberEntity, string, SubscriberInterface>
{
  constructor(
    @InjectModel(SubscriberModel.name)
    private readonly subscriberModel: Model<SubscriberModel>
  ) {}

  public async create(item: SubscriberEntity): Promise<SubscriberInterface> {
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

  public async update(
    id: string,
    item: SubscriberEntity
  ): Promise<SubscriberInterface> {
    return this.subscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
