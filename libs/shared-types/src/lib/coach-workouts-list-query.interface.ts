import { TimeSpan } from './time-span.type';

export interface CoachWorkoutsListQueryInterface {
  limit?: number;
  page?: number;
  priceMin?: number;
  priceMax?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  rating?: number;
  durations?: TimeSpan[];
}
