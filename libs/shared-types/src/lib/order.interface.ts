import {
  PaymentMethod,
  PurchaseType,
  WorkoutInterface,
} from '@fit-friends/shared-types';

export interface OrderInterface {
  id?: number;
  userId: string;
  coachId?: string;
  purchaseType: PurchaseType;
  serviceId: number;
  workout?: WorkoutInterface;
  price: number;
  quantity: number;
  total?: number;
  payment: PaymentMethod;
  createdAt?: Date;
}
