import { PurchaseType } from '@fit-friends/shared-types';
import { Expose, Transform } from 'class-transformer';
import { WorkoutRdo } from '../../workouts/rdo';
import { GymRdo } from '../../gyms/rdo';

export class ClientOrderTotal {
  @Expose()
  purchaseType: PurchaseType;

  @Expose()
  service: WorkoutRdo | GymRdo;

  @Expose({ name: '_sum' })
  @Transform(({ value }) => value.quantity)
  total: number;
}
