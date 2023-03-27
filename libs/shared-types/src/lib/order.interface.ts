import { PaymentMethod, PurchaseType } from '@fit-friends/shared-types';

export interface OrderInterface {
  id?: number;
  userId: string;
  coachId?: string;
  purchaseType: PurchaseType;
  serviceId: number;
  price: number;
  quantity: number;
  total?: number;
  payment: PaymentMethod;
  createdAt?: Date;
}
