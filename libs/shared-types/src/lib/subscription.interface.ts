import { SubscriptionType } from './subscription-type.enum';

export interface SubscriptionInterface {
  _id?: string;
  type: SubscriptionType;
  clientId: string;
  email: string;
  clientName: string;
  coachName: string;
  coachId: string;
}
