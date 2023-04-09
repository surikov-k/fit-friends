import {
  RegisterInterface,
  Skill,
  WorkoutType,
} from '@fit-friends/shared-types';

export interface UserInterface extends Omit<RegisterInterface, 'password'> {
  _id?: string;
  createdAt?: Date;
  refreshTokenHash?: string;

  skill?: Skill;
  trainings?: WorkoutType[];
  friends?: string[];
}
