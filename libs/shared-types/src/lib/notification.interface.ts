import { UserInterface } from './user.interface';

export interface NotificationInterface {
  createdAt: Date;
  user: UserInterface;
  text: string;
}
