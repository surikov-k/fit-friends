import { SubscriptionType } from './subscription-type.enum';

export interface SubscriptionInterface {
  _id?: string;
  type: SubscriptionType;
  coachId?: string;
}
