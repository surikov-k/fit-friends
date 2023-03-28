import { Expose } from 'class-transformer';
import {
  PaymentMethod,
  PurchaseType,
  WorkoutInterface,
} from '@fit-friends/shared-types';

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
  workout: WorkoutInterface;

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
