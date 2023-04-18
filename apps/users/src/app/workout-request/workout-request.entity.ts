import {
  RequestStatus,
  UserInterface,
  WorkoutRequestInterface,
} from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

export class WorkoutRequestEntity
  implements WorkoutRequestInterface, EntityInterface<WorkoutRequestInterface>
{
  changedAt: Date;
  createdAt: Date;
  initiator: UserInterface;
  status: RequestStatus;
  user: UserInterface;

  constructor(workoutRequest: WorkoutRequestInterface) {
    this.fillEntity(workoutRequest);
  }

  fillEntity(workoutRequest: WorkoutRequestInterface): void {
    this.initiator = workoutRequest.initiator;
    this.user = workoutRequest.user;
    this.status = RequestStatus.Pending;
  }

  changeStatus(status: RequestStatus) {
    this.status = status;
  }

  toObject(): WorkoutRequestInterface {
    return { ...this };
  }
}
