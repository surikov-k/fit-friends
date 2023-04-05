import { Expose } from 'class-transformer';
import { MealType } from '@fit-friends/shared-types';

export class MealLogEntryRdo {
  @Expose()
  id: number;

  @Expose()
  calories: number;

  @Expose()
  type: MealType;

  @Expose()
  createdAt: Date;
}
