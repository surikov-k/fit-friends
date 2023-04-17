import {
  SubscriptionInterface,
  SubscriptionType,
} from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

export class SubscriptionEntity
  implements SubscriptionInterface, EntityInterface<SubscriptionInterface>
{
  _id?: string;
  type: SubscriptionType;
  clientId: string;
  coachId: string;
  clientName: string;
  coachName: string;
  email: string;

  constructor(subscription: SubscriptionInterface) {
    this.fillEntity(subscription);
  }

  fillEntity(subscription: SubscriptionInterface): void {
    this._id = subscription._id;
    this.type = subscription.type;
    this.clientId = subscription.clientId;
    this.coachId = subscription.coachId;
    this.clientName = subscription.clientName;
    this.coachName = subscription.coachName;
    this.email = subscription.email;
  }

  toObject(): SubscriptionInterface {
    return { ...this };
  }
}
