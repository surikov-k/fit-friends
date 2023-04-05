import { Meal } from '@fit-friends/shared-types';

export interface MealInterface {
  id?: number;
  userId: string;
  type: Meal;
  calories: number;
  createdAt: Date;
}
