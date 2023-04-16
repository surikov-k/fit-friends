import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { SubscriptionInterface } from '@fit-friends/shared-types';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionModel } from './subscription.model';

@Injectable()
export class SubscriptionRepository
  implements
    CrudRepositoryInterface<SubscriptionEntity, string, SubscriptionInterface>
{
  constructor(
    @InjectModel(SubscriptionModel.name)
    private readonly subscriptionModel: Model<SubscriptionModel>
  ) {}

  public async create(
    item: SubscriptionEntity
  ): Promise<SubscriptionInterface> {
    const subscription = new this.subscriptionModel(item);
    return subscription.save();
  }

  public async destroy(id: string): Promise<void> {
    this.subscriptionModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<SubscriptionInterface | null> {
    return this.subscriptionModel.findOne({ id }).exec();
  }

  public async findByCoachId(
    coachId: string
  ): Promise<SubscriptionInterface[]> {
    return this.subscriptionModel.find({ coachId }).exec();
  }

  public async update(
    id: string,
    item: SubscriptionEntity
  ): Promise<SubscriptionInterface> {
    return Promise.resolve(undefined);
  }
}
