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
    entity: SubscriptionEntity
  ): Promise<SubscriptionInterface> {
    const subscriber = new this.subscriptionModel(entity);
    return subscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.subscriptionModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<SubscriptionInterface | null> {
    return this.subscriptionModel.findOne({ id }).exec();
  }

  public async findByEmail(
    email: string
  ): Promise<SubscriptionInterface | null> {
    return this.subscriptionModel
      .findOne({ email })
      .populate('subscriptions')
      .exec();
  }

  public async update(
    id: string,
    item: SubscriptionEntity
  ): Promise<SubscriptionInterface> {
    return this.subscriptionModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByClientAndCoach(clientId, coachId) {
    return this.subscriptionModel.findOne({ clientId, coachId });
  }

  public async findByCoachId(
    coachId: string
  ): Promise<SubscriptionInterface[]> {
    return this.subscriptionModel.find({ coachId }).exec();
  }
}
