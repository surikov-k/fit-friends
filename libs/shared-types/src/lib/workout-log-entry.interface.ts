import { TimeSpan } from '@fit-friends/shared-types';

export interface WorkoutLogEntryInterface {
  id?: number;
  workoutId: number;
  calories: number;
  duration: TimeSpan;
  createdAt: Date;
}
