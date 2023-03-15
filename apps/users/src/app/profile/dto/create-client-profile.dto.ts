import { Skill, TimeSpan, Training } from '@fit-friends/shared-types';
import { IsBoolean, IsEnum, IsNumber } from 'class-validator';

export class CreateClientProfileDto {
  @IsEnum(Skill)
  skill: Skill;

  @IsEnum(Training, { each: true })
  trainings: Training[];

  @IsEnum(TimeSpan)
  duration: TimeSpan;

  @IsNumber()
  caloriesTarget: number;

  @IsNumber()
  caloriesPerDay: number;

  @IsBoolean()
  readiness: boolean;
}
