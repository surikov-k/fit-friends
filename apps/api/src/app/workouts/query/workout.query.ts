import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  TimeSpan,
  UserRole,
  WorkoutsListQueryInterface,
  WorkoutType,
} from '@fit-friends/shared-types';
import {
  Calories,
  Price,
  Rating,
  WorkoutIndexQueryDefault,
} from '../workout.constants';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutQuery implements WorkoutsListQueryInterface {
  @ApiPropertyOptional({
    description: 'A limit of the workouts per page',
    default: WorkoutIndexQueryDefault.ITEMS_PER_PAGE,
  })
  @Transform(
    ({ value }) =>
      parseInt(value, 10) || (WorkoutIndexQueryDefault.ITEMS_PER_PAGE as number)
  )
  @IsNumber({}, { always: true })
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
  @IsNumber({}, { always: true })
  @IsOptional()
  public page: number = WorkoutIndexQueryDefault.PAGE;

  @ApiPropertyOptional({
    description: 'A minimal value of the price filter',
  })
  @IsNumber({}, { always: true })
  @Min(Price.MIN)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || (Price.MIN as number))
  public priceMin: number;

  @ApiPropertyOptional({
    description: 'A maximal value of the price filter',
  })
  @IsNumber({}, { always: true })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public priceMax: number;

  @ApiPropertyOptional({
    description: 'A minimal value of the calories filter',
  })
  @IsNumber({}, { always: true })
  @Min(Calories.MIN)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public caloriesMin: number;

  @ApiPropertyOptional({
    description: 'A maximal value of the calories filter',
  })
  @IsNumber({}, { always: true })
  @Max(Calories.MAX)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public caloriesMax: number;

  @ApiPropertyOptional({
    description: 'Rating filter',
  })
  @IsInt({ always: true })
  @Min(Rating.MIN)
  @Max(Rating.MAX)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public rating: number;

  @ApiPropertyOptional({
    description: 'Workout duration filter, only for a coach',
    type: [TimeSpan],
    enum: TimeSpan,
  })
  @IsEnum(TimeSpan, {
    groups: [UserRole.Coach],
    each: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }
    return value.split(',');
  })
  public durations?: TimeSpan[];

  @ApiPropertyOptional({
    description: 'Workout type filter, only for a client',
    type: [WorkoutType],
    enum: WorkoutType,
  })
  @IsEnum(WorkoutType, {
    groups: [UserRole.Client],
    each: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }
    return value.split(',');
  })
  public types?: WorkoutType[];

  @ApiPropertyOptional({
    description: 'Workout list sorting, a client only',
  })
  @IsString({
    groups: [UserRole.Client],
  })
  @IsOptional()
  public sort: string;

  @ApiPropertyOptional({
    description: 'Workout list sort direction, a client only',
  })
  @IsString({
    groups: [UserRole.Client],
  })
  @IsOptional()
  public direction: string;
}
