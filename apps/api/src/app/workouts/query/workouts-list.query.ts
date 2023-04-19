import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  WorkoutsListQueryInterface,
  WorkoutType,
} from '@fit-friends/shared-types';
import {
  Calories,
  Price,
  Rating,
  WorkoutIndexQueryDefault,
} from '../workouts.constants';

export class WorkoutsListQuery implements WorkoutsListQueryInterface {
  @ApiPropertyOptional({
    description: 'A limit of the workouts per page',
    default: WorkoutIndexQueryDefault.ITEMS_PER_PAGE,
  })
  @Transform(
    ({ value }) =>
      parseInt(value, 10) || (WorkoutIndexQueryDefault.ITEMS_PER_PAGE as number)
  )
  @IsNumber()
  @IsOptional()
  public limit: number = WorkoutIndexQueryDefault.ITEMS_PER_PAGE as number;

  @ApiPropertyOptional({
    description: 'A page number',
    default: WorkoutIndexQueryDefault.PAGE,
  })
  @Transform(
    ({ value }) =>
      parseInt(value, 10) || (WorkoutIndexQueryDefault.PAGE as number)
  )
  @IsNumber()
  @IsOptional()
  public page: number = WorkoutIndexQueryDefault.PAGE;

  @ApiPropertyOptional({
    description: 'A minimal value of the price filter',
  })
  @IsNumber()
  @Min(Price.MIN)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || (Price.MIN as number))
  public priceMin: number;

  @ApiPropertyOptional({
    description: 'A maximal value of the price filter',
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public priceMax: number;

  @ApiPropertyOptional({
    description: 'A minimal value of the calories filter',
  })
  @IsNumber()
  @Min(Calories.MIN)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public caloriesMin: number;

  @ApiPropertyOptional({
    description: 'A maximal value of the calories filter',
  })
  @IsNumber()
  @Max(Calories.MAX)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public caloriesMax: number;

  @ApiPropertyOptional({
    description: 'A minimal value of the rating filter',
  })
  @IsInt()
  @Min(Rating.MIN)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public ratingMin: number;

  @ApiPropertyOptional({
    description: 'A maximum value of the rating filter',
  })
  @IsInt()
  @Min(Rating.MAX)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public ratingMax: number;

  @ApiPropertyOptional({
    description: 'Workout type filter',
    type: [WorkoutType],
    enum: WorkoutType,
  })
  @IsEnum(WorkoutType, { each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }
    return value.split(',');
  })
  public type?: WorkoutType;

  @ApiPropertyOptional({
    description: 'A sorting by price direction',
  })
  @IsString()
  @Min(Rating.MAX)
  @IsOptional()
  public sortByPrice: 'asc' | 'desc';
}
