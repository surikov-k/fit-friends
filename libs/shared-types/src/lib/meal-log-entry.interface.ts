import { MealType } from '@fit-friends/shared-types';

export interface MealLogEntryInterface {
  type: MealType;
  calories: number;
  createdAt: Date;
}
