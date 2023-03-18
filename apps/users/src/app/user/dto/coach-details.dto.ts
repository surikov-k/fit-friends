import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Skill, Training, UserRole } from '@fit-friends/shared-types';
import {
  CoachAchievements,
  MAX_TRAININGS_FOR_COACH,
  UserError,
} from '../user.constants';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsEnum(Training, { each: true, groups: [UserRole.Coach, UserRole.Client] })
  @ArrayMaxSize(MAX_TRAININGS_FOR_COACH, {
    groups: [UserRole.Coach, UserRole.Client],
  })
  trainings: Training[];

  @ApiProperty({
    description: 'Ready for personal training',
    example: true,
  })
  @IsBoolean()
  hasPersonalTrainings: boolean;

  @ApiProperty({
    description: 'Achievements of the coach',
    example:
      'Привет! Меня зовут Иванова Валерия, мне 34 года. Я профессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками.',
  })
  @IsString({ groups: [UserRole.Coach] })
  @MinLength(CoachAchievements.MIN, {
    message: UserError.ACHIEVEMENTS_TOO_SMALL,
    // groups: [UserRole.Coach],
  })
  @MaxLength(CoachAchievements.MAX, {
    message: UserError.ACHIEVEMENTS_TOO_BIG,
    // groups: [UserRole.Coach],
  })
  achievements: string;
}
