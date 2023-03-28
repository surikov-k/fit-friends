import { Expose } from 'class-transformer';
import {
  GymInterface,
  PaymentMethod,
  PurchaseType,
  WorkoutInterface,
} from '@fit-friends/shared-types';

export class OrderRdo {
  @Expose()
  id: number;

  @Expose()
  purchaseType: PurchaseType;

  @Expose()
  service?: WorkoutInterface | GymInterface;

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
