import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { Skill, TimeSpan, Training } from '@fit-friends/shared-types';
import {
  CaloriesPerDay,
  CaloriesTarget,
  ClientInfo,
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

  @ApiProperty({
    description: 'Client info',
    example:
      'Привет! Я Катерина и мне 27 лет. Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и пилатесом. Занимаюсь как с тренером индивидуально, так и на групповых занятиях. Люблю соревнования и челленджи, так что присоединяйтесь, давайте объединяться и заниматься вместе!)',
  })
  @IsString()
  @MinLength(ClientInfo.MIN, {
    message: UserError.CLIENT_INGO_TOO_SMALL,
  })
  @MaxLength(ClientInfo.MAX, {
    message: UserError.CLIENT_INGO_TOO_BIG,
  })
  info: string;
}
