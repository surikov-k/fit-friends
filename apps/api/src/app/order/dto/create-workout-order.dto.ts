import {
  OrderInterface,
  PaymentMethod,
  PurchaseType,
} from '@fit-friends/shared-types';

export class CreateWorkoutOrderDto
  implements Omit<OrderInterface, 'createdAt' | 'total' | 'userId'>
{
  payment: PaymentMethod;
  coachId: string;
  price: number;
  purchaseType: PurchaseType;
  quantity: number;
  serviceId: number;
}
