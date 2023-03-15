import {
  Gender,
  Location,
  Skill,
  Training,
  UserRole,
} from '@fit-friends/shared-types';

export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  gender: Gender;
  birthday?: Date;
  role: UserRole;
  location: Location;

  skill?: Skill;
  trainings?: Training[];

  createdAt?: Date;
  refreshTokenHash?: string;
}
