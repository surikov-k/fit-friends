import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  Gender,
  Skill,
  TimeSpan,
  WorkoutInterface,
  WorkoutType,
} from '@fit-friends/shared-types';
import { Calories, DescriptionLength, Price } from './workout.constants';

export class CreateWorkoutDto
  implements
    Omit<WorkoutInterface, 'rating' | 'coachId' | 'reviews' | 'background'>
{
  @IsInt()
  @Min(Calories.MIN)
  @Max(Calories.MAX)
  calories: number;

  @IsString()
  @MinLength(DescriptionLength.MIN)
  @MaxLength(DescriptionLength.MAX)
  description: string;

  @IsEnum(TimeSpan)
  duration: TimeSpan;

  @IsEnum(Gender)
  gender: Gender;

  @IsBoolean()
  isSpecialOffer: boolean;

  @IsInt()
  @Min(Price.MIN)
  price: number;

  @IsEnum(Skill)
  skill: Skill;

  @IsString()
  title: string;

  @IsEnum(WorkoutType)
  type: WorkoutType;

  @IsString()
  video: string;
}
