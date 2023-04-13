import { WorkoutStatus } from './workout-status.type';

export interface WorkoutLogEntryInterface {
  id?: number;
  workoutId: number;
  createdAt?: Date;
  status?: WorkoutStatus;
  userId: string;
}
