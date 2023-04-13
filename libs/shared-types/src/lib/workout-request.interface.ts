import { UserInterface } from './user.interface';
import { RequestStatus } from './request-status.enum';

export interface WorkoutRequestInterface {
  initiator: UserInterface;
  user: UserInterface;
  createdAt: Date;
  changedAt: Date;
  status: RequestStatus;
}
