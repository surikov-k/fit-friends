import { UserInterface } from './user.interface';
import { TimeSpan } from './time-span.type';

export interface ClientInterface extends UserInterface {
  duration: TimeSpan;
  caloriesTarget: number;
  caloriesPerDay: number;
  readiness: boolean;
}
