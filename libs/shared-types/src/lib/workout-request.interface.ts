import { RequestStatus, UserInterface } from '@fit-friends/shared-types';

export interface WorkoutRequestInterface {
  initiator: UserInterface;
  user: UserInterface;
  createdAt: Date;
  changedAt: Date;
  status: RequestStatus;
}
