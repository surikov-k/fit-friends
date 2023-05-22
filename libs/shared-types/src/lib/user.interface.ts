import { RegisterInterface } from './register.interface';
import { Skill } from './skill.type';
import { WorkoutType } from './workout-type.type';

export interface UserInterface extends Omit<RegisterInterface, 'password'> {
  _id?: string;
  createdAt?: Date;
  refreshTokenHash?: string;
  passwordHash?: string;

  skill?: Skill;
  trainings?: WorkoutType[];
  friends?: string[];
  caloriesPerDay?: number
  caloriesTarget?: number
}
