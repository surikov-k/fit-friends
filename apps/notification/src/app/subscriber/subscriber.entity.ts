import {
  SubscriberInterface,
  SubscriptionInterface,
} from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

export class SubscriberEntity
  implements SubscriberInterface, EntityInterface<SubscriberInterface>
{
  _id?: string;
  active: boolean;
  email: string;
  name: string;
  subscriptions: SubscriptionInterface[];
  userId: string;

  constructor(subscriber: SubscriberInterface) {
    this.fillEntity(subscriber);
  }

  fillEntity(subscriber: SubscriberInterface): void {
    this._id = subscriber._id;
    this.active = subscriber.active;
    this.name = subscriber.name;
    this.userId = subscriber.userId;
  }

  toObject(): SubscriberInterface {
    return { ...this };
  }
}
