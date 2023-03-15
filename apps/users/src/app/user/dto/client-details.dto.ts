import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsInt,
  Max,
  Min,
} from 'class-validator';

import { Skill, TimeSpan, Training } from '@fit-friends/shared-types';
import {
  CaloriesPerDay,
  CaloriesTarget,
  MAX_TRAININGS_FOR_CLIENT,
  UserError,
} from '../user.constants';

export class ClientDetailsDto {
  @IsEnum(Skill)
  skill: Skill;

  @IsEnum(Training, { each: true })
  @ArrayMaxSize(MAX_TRAININGS_FOR_CLIENT)
  trainings: Training[];

  @IsEnum(TimeSpan)
  duration: TimeSpan;

  @IsInt()
  @Min(CaloriesTarget.MIN, {
    message: UserError.CALORIES_TARGET_TOO_SMALL,
  })
  @Max(CaloriesTarget.MAX, {
    message: UserError.CALORIES_TARGET_TOO_BIG,
  })
  caloriesTarget: number;

  @IsInt()
  @Min(CaloriesPerDay.MIN, {
    message: UserError.DAILY_CALORIES_TOO_SMALL,
  })
  @Max(CaloriesPerDay.MAX, {
    message: UserError.DAILY_CALORIES_TOO_BIG,
  })
  caloriesPerDay: number;

  @IsBoolean()
  readiness: boolean;
}
