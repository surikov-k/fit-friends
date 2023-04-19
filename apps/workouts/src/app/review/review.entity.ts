import { EntityInterface } from '@fit-friends/core';
import { ReviewInterface } from '@fit-friends/shared-types';

export class ReviewEntity
  implements EntityInterface<ReviewInterface>, ReviewInterface
{
  clientId: string;
  workoutId: number;
  createdAt: Date;
  rating: number;
  text: string;

  constructor(review: ReviewInterface) {
    this.fillEntity(review);
  }

  fillEntity(review: ReviewInterface): void {
    this.clientId = review.clientId;
    this.createdAt = review.createdAt;
    this.rating = review.rating;
    this.text = review.text;
    this.workoutId = review.workoutId;
  }

  toObject(): ReviewEntity {
    return { ...this };
  }
}
