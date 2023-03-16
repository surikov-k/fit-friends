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
import { ApiProperty } from '@nestjs/swagger';

export class ClientDetailsDto {
  @ApiProperty({
    description: 'User skill',
    example: 'Beginner',
  })
  @IsEnum(Skill)
  skill: Skill;

  @ApiProperty({
    description: 'Workout type',
    example: 'Йога',
  })
  @IsEnum(Training, { each: true })
  @ArrayMaxSize(MAX_TRAININGS_FOR_CLIENT)
  trainings: Training[];

  @ApiProperty({
    description: 'Workout duration',
    example: '10-30 min',
  })
  @IsEnum(TimeSpan)
  duration: TimeSpan;

  @ApiProperty({
    description: 'The number of calories to lose',
    example: 3000,
  })
  @IsInt()
  @Min(CaloriesTarget.MIN, {
    message: UserError.CALORIES_TARGET_TOO_SMALL,
  })
  @Max(CaloriesTarget.MAX, {
    message: UserError.CALORIES_TARGET_TOO_BIG,
  })
  caloriesTarget: number;

  @ApiProperty({
    description: 'Number of calories to lose per day',
    example: 1500,
  })
  @IsInt()
  @Min(CaloriesPerDay.MIN, {
    message: UserError.DAILY_CALORIES_TOO_SMALL,
  })
  @Max(CaloriesPerDay.MAX, {
    message: UserError.DAILY_CALORIES_TOO_BIG,
  })
  caloriesPerDay: number;

  @ApiProperty({
    description: 'Готовность к тренировке',
    example: true,
  })
  @IsBoolean()
  readiness: boolean;
}
