import { Meal } from './meal.type';

export interface MealInterface {
  id?: number;
  userId: string;
  type: Meal;
  calories: number;
  createdAt: Date;
}
