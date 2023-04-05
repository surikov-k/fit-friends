import { Expose } from 'class-transformer';
import { Meal } from '@fit-friends/shared-types';

export class MealLogEntryRdo {
  @Expose()
  id: number;

  @Expose()
  calories: number;

  @Expose()
  type: Meal;

  @Expose()
  createdAt: Date;
}
