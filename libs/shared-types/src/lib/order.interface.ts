import { PaymentMethod, PurchaseType } from '@fit-friends/shared-types';

export interface OrderInterface {
  purchaseType: PurchaseType;
  serviceId: string;
  price: number;
  quantity: number;
  total: number;
  payment: PaymentMethod;
  createdAt: Date;
}
