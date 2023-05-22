import { UserInterface } from './user.interface';

export interface CoachInterface extends UserInterface {
  certificates: string[];
  hasPersonalTrainings: boolean;
  achievements?: string;
  info?: string;
}
