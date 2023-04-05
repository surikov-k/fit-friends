import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInt } from 'class-validator';

import { Meal, MealInterface } from '@fit-friends/shared-types';

export class CreateMealLogEntryDto implements MealInterface {
  @IsInt()
  calories: number;

  @IsEnum(Meal)
  type: Meal;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt: Date;
}
