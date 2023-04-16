import { SubscriptionInterface } from './subscription.interface';

export interface SubscriberInterface {
  _id?: string;
  email: string;
  name: string;
  userId: string;
  active: boolean;
  subscriptions: SubscriptionInterface[];
}
