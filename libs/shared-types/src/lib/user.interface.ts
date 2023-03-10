import { Gender, Location, UserRole } from '@fit-friends/shared-types';

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
  createdAt?: Date;
  rtHash?: string;
}
