import { MealType } from '@fit-friends/shared-types';

export interface MealLogEntryInterface {
  id?: number;
  type: MealType;
  calories: number;
  createdAt: Date;
}
