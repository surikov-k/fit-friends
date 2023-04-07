import { TimeSpan, WorkoutType } from '@fit-friends/shared-types';

export interface WorkoutsListQueryInterface {
  page?: number;
  priceMin?: number;
  priceMax?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  rating?: number;
  durations?: TimeSpan[];
  types?: WorkoutType[];
  sort?: string;
  direction?: string;
}
