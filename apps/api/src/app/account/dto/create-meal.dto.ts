import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInt, Min } from 'class-validator';

import { Meal, MealInterface } from '@fit-friends/shared-types';

export class CreateMealDto implements Omit<MealInterface, 'userId'> {
  @IsInt()
  @Min(0)
  calories: number;

  @IsEnum(Meal)
  type: Meal;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt: Date;
}
