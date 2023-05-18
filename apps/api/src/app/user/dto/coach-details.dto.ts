import {
  ArrayMaxSize,
  ArrayUnique,
  IsBoolean,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Skill, UserRole, WorkoutType } from '@fit-friends/shared-types';

import { ApiProperty } from '@nestjs/swagger';
import {
  CoachAchievements,
  MAX_TRAININGS_FOR_COACH,
  UserError,
} from '../user.constants';

export class CoachDetailsDto {
  @ApiProperty({
    description: 'User skill',
    example: 'Amateur',
  })
  @IsEnum(Skill, { groups: [UserRole.Coach, UserRole.Client] })
  skill: Skill;

  @ApiProperty({
    description: 'Workout type',
    example: 'Кроссфит',
  })
  @IsEnum(WorkoutType, {
    each: true,
    groups: [UserRole.Coach, UserRole.Client],
  })
  @ArrayMaxSize(MAX_TRAININGS_FOR_COACH, {
    groups: [UserRole.Coach, UserRole.Client],
  })
  @ArrayUnique()
  trainings: WorkoutType[];

  @ApiProperty({
    description: 'Ready for personal training',
    example: true,
  })
  @IsBoolean({ groups: [UserRole.Coach] })
  hasPersonalTrainings: boolean;

  @ApiProperty({
    description: 'Achievements of the coach',
    example:
      'Привет! Меня зовут Иванова Валерия, мне 34 года. Я профессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками.',
  })
  @IsString({ groups: [UserRole.Coach] })
  @MinLength(CoachAchievements.MIN, {
    message: UserError.ACHIEVEMENTS_TOO_SMALL,
  })
  @MaxLength(CoachAchievements.MAX, {
    message: UserError.ACHIEVEMENTS_TOO_BIG,
  })
  achievements: string;
}
