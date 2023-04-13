import { PurchaseType } from './purchase-type.enum';
import { WorkoutInterface } from './workout.interface';
import { GymInterface } from './gym.interface';
import { PaymentMethod } from './payment-method.enum';

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
