import { User } from '@fit-friends/shared-types';

export interface NotificationInterface {
  createdAt: Date;
  user: User;
  text: string;
}
