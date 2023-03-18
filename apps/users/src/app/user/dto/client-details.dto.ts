import {
  ArrayMaxSize,
  ArrayUnique,
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { Skill, TimeSpan, Training, UserRole } from '@fit-friends/shared-types';
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
  @IsEnum(Skill, { groups: [UserRole.Client, UserRole.Coach] })
  skill: Skill;

  @ApiProperty({
    description: 'Workout type',
    example: 'Йога',
  })
  @IsEnum(Training, { each: true, groups: [UserRole.Client, UserRole.Coach] })
  @ArrayMaxSize(MAX_TRAININGS_FOR_CLIENT, { groups: [UserRole.Client] })
  @ArrayUnique()
  trainings: Training[];

  @ApiProperty({
    description: 'Workout duration',
    example: '10-30 min',
  })
  @IsEnum(TimeSpan, { groups: [UserRole.Client] })
  duration: TimeSpan;

  @ApiProperty({
    description: 'The number of calories to lose',
    example: 3000,
  })
  @IsInt()
  @Min(CaloriesTarget.MIN, {
    message: UserError.CALORIES_TARGET_TOO_SMALL,
    groups: [UserRole.Client],
  })
  @Max(CaloriesTarget.MAX, {
    message: UserError.CALORIES_TARGET_TOO_BIG,
    groups: [UserRole.Client],
  })
  caloriesTarget: number;

  @ApiProperty({
    description: 'Number of calories to lose per day',
    example: 1500,
  })
  @IsInt({ groups: [UserRole.Client] })
  @Min(CaloriesPerDay.MIN, {
    message: UserError.DAILY_CALORIES_TOO_SMALL,
    groups: [UserRole.Client],
  })
  @Max(CaloriesPerDay.MAX, {
    message: UserError.DAILY_CALORIES_TOO_BIG,
    groups: [UserRole.Client],
  })
  caloriesPerDay: number;

  @ApiProperty({
    description: 'Ready for training',
    example: true,
  })
  @IsBoolean({ groups: [UserRole.Client] })
  readiness: boolean;

  @ApiProperty({
    description: 'Client info',
    example:
      'Привет! Я Катерина и мне 27 лет. Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и пилатесом. Занимаюсь как с тренером индивидуально, так и на групповых занятиях. Люблю соревнования и челленджи, так что присоединяйтесь, давайте объединяться и заниматься вместе!)',
  })
  @IsString({ groups: [UserRole.Client] })
  @MinLength(ClientInfo.MIN, {
    message: UserError.CLIENT_INGO_TOO_SMALL,
    groups: [UserRole.Client],
  })
  @MaxLength(ClientInfo.MAX, {
    message: UserError.CLIENT_INGO_TOO_BIG,
    groups: [UserRole.Client],
  })
  info: string;
}
