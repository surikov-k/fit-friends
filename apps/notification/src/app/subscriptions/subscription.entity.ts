import {
  SubscriptionInterface,
  SubscriptionType,
} from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

export class SubscriptionEntity
  implements SubscriptionInterface, EntityInterface<SubscriptionInterface>
{
  _id?: string;
  coachId: string;
  type: SubscriptionType;

  constructor(subscription: SubscriptionInterface) {
    this.fillEntity(subscription);
  }

  fillEntity(subscription: SubscriptionInterface): void {
    this._id = subscription._id;
    this.coachId = subscription.coachId;
    this.type = subscription.type;
  }

  toObject(): SubscriptionInterface {
    return { ...this };
  }
}
