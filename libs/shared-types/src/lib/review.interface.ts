import { User } from '@fit-friends/shared-types';

export interface ReviewInterface {
  author: User;
  workoutId: string;
  rating: number;
  text: string;
  createdAt: Date;
}
