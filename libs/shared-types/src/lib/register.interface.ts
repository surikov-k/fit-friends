import { Gender, Location, UserRole } from '@fit-friends/shared-types';

export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  avatar: string;
  gender: Gender;
  birthday?: Date;
  role: UserRole;
  location: Location;
}
