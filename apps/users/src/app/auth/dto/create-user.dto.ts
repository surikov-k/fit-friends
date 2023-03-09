import { Gender, UserRole } from '@fit-friends/shared-types';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  birthday?: Date;
  role: UserRole;
  location: Location;
}
