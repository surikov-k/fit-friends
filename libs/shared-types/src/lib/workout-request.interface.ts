import { RequestStatus, User } from '@fit-friends/shared-types';

export interface WorkoutRequestInterface {
  initiator: User;
  user: User;
  createdAt: Date;
  changedAt: Date;
  status: RequestStatus;
}
