import { Expose } from 'class-transformer';
import { PaymentMethod, PurchaseType } from '@fit-friends/shared-types';

export class WorkoutOrderRdo {
  @Expose()
  id: number;

  @Expose()
  userId: string;

  @Expose()
  coachId: string;

  @Expose()
  purchaseType: PurchaseType;

  @Expose()
  serviceId: number;

  @Expose()
  price: number;

  @Expose()
  quantity: number;

  @Expose()
  total: number;

  @Expose()
  payment: PaymentMethod;

  @Expose()
  createdAt: Date;
}
