import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { Skill, Training } from '@fit-friends/shared-types';

export class CreateCoachProfileDto {
  @IsEnum(Skill)
  skill: Skill;

  @IsEnum(Training, { each: true })
  trainings: Training[];

  @IsString()
  certificate: string;

  @IsBoolean()
  hasPersonalTrainings: boolean;

  @IsString()
  achievements: string;
}
