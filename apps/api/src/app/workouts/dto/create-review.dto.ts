import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Rating, ReviewLength } from '../workouts.constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Workout rating',
    example: 3,
  })
  @IsInt()
  @Min(Rating.MIN)
  @Max(Rating.MAX)
  rating: number;

  @ApiProperty({
    description: 'Review text',
    example:
      'Регулярно выполняю эту тренировку дома и вижу результат! Спина стала прямее, появилось больше сил и гибкость тоже стала лучше, хотя упражнения довольно простые.',
  })
  @IsString()
  @MinLength(ReviewLength.MIN)
  @MaxLength(ReviewLength.MAX)
  text: string;
}
