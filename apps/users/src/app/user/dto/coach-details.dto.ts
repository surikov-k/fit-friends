import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Skill, Training } from '@fit-friends/shared-types';
import {
  CoachAchievements,
  MAX_TRAININGS_FOR_COACH,
  UserError,
} from '../user.constants';

export class CoachDetailsDto {
  @IsEnum(Skill)
  skill: Skill;

  @IsEnum(Training, { each: true })
  @ArrayMaxSize(MAX_TRAININGS_FOR_COACH)
  trainings: Training[];

  @IsBoolean()
  hasPersonalTrainings: boolean;

  @IsString()
  @MinLength(CoachAchievements.MIN, {
    message: UserError.ACHIEVEMENTS_TOO_SMALL,
  })
  @MaxLength(CoachAchievements.MAX, {
    message: UserError.ACHIEVEMENTS_TOO_BIG,
  })
  achievements: string;
}
