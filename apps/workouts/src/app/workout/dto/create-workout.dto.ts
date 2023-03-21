import { IsBoolean, IsEnum, IsInt, IsString } from 'class-validator';
import {
  Gender,
  Skill,
  TimeSpan,
  WorkoutInterface,
  WorkoutType,
} from '@fit-friends/shared-types';

export class CreateWorkoutDto
  implements
    Omit<WorkoutInterface, 'rating' | 'coachId' | 'reviews' | 'background'>
{
  @IsInt()
  calories: number;

  @IsString()
  description: string;

  @IsEnum(TimeSpan)
  duration: TimeSpan;

  @IsEnum(Gender)
  gender: Gender;

  @IsBoolean()
  isSpecialOffer: boolean;

  @IsInt()
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
