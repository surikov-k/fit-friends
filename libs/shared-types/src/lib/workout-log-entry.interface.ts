import { TimeSpan, WorkoutStatus } from '@fit-friends/shared-types';

export interface WorkoutLogEntryInterface {
  id?: number;
  workoutId: number;
  createdAt?: Date;
  status?: WorkoutStatus;
  userId: string;
}
