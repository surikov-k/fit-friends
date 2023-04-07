import { EntityInterface } from '@fit-friends/core';
import { Meal, MealInterface } from '@fit-friends/shared-types';

export class MealEntity implements EntityInterface<MealEntity>, MealInterface {
  calories: number;
  createdAt: Date;
  id: number;
  type: Meal;
  userId: string;

  constructor(meal: MealInterface) {
    this.fillEntity(meal);
  }

  fillEntity(meal: MealInterface): void {
    this.calories = meal.calories;
    this.createdAt = meal.createdAt;
    this.id = meal.id;
    this.type = meal.type;
    this.userId = meal.userId;
  }

  toObject(): MealEntity {
    return { ...this };
  }
}
