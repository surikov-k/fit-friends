import { UserInterface } from './user.interface';

export interface CoachInterface extends UserInterface {
  certificate: string;
  hasPersonalTrainings: boolean;
  achievements: string;
  info: string;
}
