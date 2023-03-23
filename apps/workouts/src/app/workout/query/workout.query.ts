import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { TimeSpan, UserRole, WorkoutType } from '@fit-friends/shared-types';
import {
  Calories,
  Price,
  Rating,
  WorkoutIndexQueryDefault,
} from '../workout.constants';
import { Transform } from 'class-transformer';

export class WorkoutQuery {
  @Transform(
    ({ value }) =>
      parseInt(value, 10) || (WorkoutIndexQueryDefault.ITEMS_PER_PAGE as number)
  )
  @IsNumber({}, { always: true })
  @IsOptional()
  public limit: number = WorkoutIndexQueryDefault.ITEMS_PER_PAGE as number;

  @Transform(
    ({ value }) =>
      parseInt(value, 10) || (WorkoutIndexQueryDefault.PAGE as number)
  )
  @IsNumber({}, { always: true })
  @IsOptional()
  public page: number = WorkoutIndexQueryDefault.PAGE;

  @IsNumber({}, { always: true })
  @Min(Price.MIN)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || (Price.MIN as number))
  public priceMin: number;

  @IsNumber({}, { always: true })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public priceMax: number;

  @IsNumber({}, { always: true })
  @Min(Calories.MIN)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public caloriesMin: number;

  @IsNumber({}, { always: true })
  @Max(Calories.MAX)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public caloriesMax: number;

  @IsNumber({}, { always: true })
  @Min(Rating.MIN)
  @Max(Rating.MAX)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public rating: number;

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

  @IsString({
    groups: [UserRole.Client],
    each: true,
  })
  @IsOptional()
  public sort: string;

  @IsString({
    groups: [UserRole.Client],
    each: true,
  })
  @IsOptional()
  public direction: string;
}
