import { Gender, Location, UserRole } from '@fit-friends/shared-types';

export class RegisterDto {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  birthday?: Date;
  role: UserRole;
  location: Location;
}
