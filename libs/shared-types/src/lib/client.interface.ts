import { TimeSpan, UserInterface } from '@fit-friends/shared-types';

export interface ClientInterface extends UserInterface {
  duration: TimeSpan;
  caloriesTarget: number;
  caloriesPerDay: number;
  readiness: boolean;
  info: string;
}
