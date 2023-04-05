import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInt } from 'class-validator';

import { MealLogEntryInterface, MealType } from '@fit-friends/shared-types';

export class CreateMealLogEntryDto implements MealLogEntryInterface {
  @IsInt()
  calories: number;

  @IsEnum(MealType)
  type: MealType;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt: Date;
}
