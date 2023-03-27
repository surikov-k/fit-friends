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
import { ApiProperty } from '@nestjs/swagger';
import {
  Calories,
  DescriptionLength,
  Price,
  TitleLength,
} from '../workout.constants';

export class CreateWorkoutDto
  implements
    Omit<WorkoutInterface, 'rating' | 'coachId' | 'reviews' | 'background'>
{
  @ApiProperty({
    description: 'Numbers of calories',
    example: 1320,
  })
  @IsInt()
  @Min(Calories.MIN)
  @Max(Calories.MAX)
  calories: number;

  @ApiProperty({
    description: 'Description of the workout',
    example:
      'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
  })
  @IsString()
  @MinLength(DescriptionLength.MIN)
  @MaxLength(DescriptionLength.MAX)
  description: string;

  @ApiProperty({
    description: 'Длительность тренировки',
    example: 'Short',
  })
  @IsEnum(TimeSpan)
  duration: TimeSpan;

  @ApiProperty({
    description: 'Gender of the user for whom the workout is intended',
    example: 'Female',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Mark of the special offer',
    example: true,
  })
  @IsBoolean()
  isSpecialOffer: boolean;

  @ApiProperty({
    description: 'The cost of the workout in rubles',
    example: 800,
  })
  @IsInt()
  @Min(Price.MIN)
  price: number;

  @ApiProperty({
    description: 'Skill of the client for whom the workout is intended',
    example: 'Beginner',
  })
  @IsEnum(Skill)
  skill: Skill;
  @ApiProperty({
    description: 'Workout name',
    example: 'Energy',
  })
  @IsString()
  @MinLength(TitleLength.MIN)
  @MaxLength(TitleLength.MAX)
  title: string;

  @ApiProperty({
    description: 'Workout type',
    example: 'Pilates',
  })
  @IsEnum(WorkoutType)
  type: WorkoutType;

  @ApiProperty({
    description: 'Workout video',
    example: 'pilates.mp4',
  })
  @IsString()
  video: string;
}
