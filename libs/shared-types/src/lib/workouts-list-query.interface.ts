import { WorkoutType } from './workout-type.type';

export interface WorkoutsListQueryInterface {
  limit?: number;
  page?: number;
  priceMin?: number;
  priceMax?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  ratingMin?: number;
  ratingMax?: number;
  type?: WorkoutType;
  sortByPrice?: 'asc' | 'desc';
}
