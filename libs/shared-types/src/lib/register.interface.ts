import { Gender } from './gender.enum';
import { UserRole } from './user-role.enum';
import { Location } from './location.enum';

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
