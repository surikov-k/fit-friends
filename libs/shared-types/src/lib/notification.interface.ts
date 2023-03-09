import { UserInterface } from '@fit-friends/shared-types';

export interface NotificationInterface {
  createdAt: Date;
  user: UserInterface;
  text: string;
}
