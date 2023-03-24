import { PaymentMethod, PurchaseType } from '@fit-friends/shared-types';

export interface OrderInterface {
  id?: number;
  userId: string;
  purchaseType: PurchaseType;
  serviceId: number;
  price: number;
  quantity: number;
  total: number;
  payment: PaymentMethod;
  createdAt: Date;
}
