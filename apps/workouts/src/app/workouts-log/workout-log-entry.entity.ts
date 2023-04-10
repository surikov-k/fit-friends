import { EntityInterface } from '@fit-friends/core';
import {
  WorkoutLogEntryInterface,
  WorkoutStatus,
} from '@fit-friends/shared-types';

export class WorkoutLogEntryEntity
  implements
    EntityInterface<WorkoutLogEntryInterface>,
    WorkoutLogEntryInterface
{
  id?: number;
  createdAt?: Date;
  status?: WorkoutStatus;
  userId: string;
  workoutId: number;

  constructor(logEntry: WorkoutLogEntryInterface) {
    this.fillEntity(logEntry);
  }

  fillEntity(entity: WorkoutLogEntryInterface): void {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.status = entity.status;
    this.userId = entity.userId;
    this.workoutId = entity.workoutId;
  }

  completeWorkout() {
    this.status = WorkoutStatus.Completed;
  }

  toObject(): WorkoutLogEntryInterface {
    return { ...this };
  }
}
