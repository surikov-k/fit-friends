import {
  GymInterface,
  PaymentMethod,
  PurchaseType,
  WorkoutInterface,
} from '@fit-friends/shared-types';

export interface OrderInterface {
  id?: number;
  userId: string;
  purchaseType: PurchaseType;
  serviceId: number;
  service?: WorkoutInterface | GymInterface;
  price: number;
  quantity: number;
  total?: number;
  payment: PaymentMethod;
  createdAt?: Date;
}
