import {
  Gender,
  Location,
  Skill,
  TimeSpan,
  UserRole,
  WorkoutType,
} from '@fit-friends/shared-types';

export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;
  gender: Gender;
  birthday?: Date;
  role: UserRole;
  location: Location;

  skill?: Skill;
  trainings?: WorkoutType[];

  duration?: TimeSpan;
  caloriesTarget?: number;
  caloriesPerDay?: number;
  readiness?: boolean;
  hasPersonalTrainings?: boolean;
  achievements?: string;
  info?: string;

  createdAt?: Date;
  refreshTokenHash?: string;
  friends?: string[];
}
