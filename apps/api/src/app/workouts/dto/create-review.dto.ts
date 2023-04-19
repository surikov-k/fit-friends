import { IsInt, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  rating: number;

  @IsString()
  text: string;
}
