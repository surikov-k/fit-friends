import { UserInterface } from '@fit-friends/shared-types';

export interface ReviewInterface {
  author: UserInterface;
  workoutId: string;
  rating: number;
  text: string;
  createdAt: Date;
}
