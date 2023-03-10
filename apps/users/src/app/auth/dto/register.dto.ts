import {
  IsDateString,
  IsEmail,
  IsEnum,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Gender, Location, UserRole } from '@fit-friends/shared-types';
import { IsEmailUnique } from '../../../common/validators';
import {
  AuthError,
  PasswordLength,
  USERNAME_PATTERN,
  UsernameLength,
} from '../auth.contstants';

export class RegisterDto {
  @MinLength(UsernameLength.MIN, {
    message: AuthError.NAME_TOO_SHORT,
  })
  @MaxLength(UsernameLength.MAX, {
    message: AuthError.NAME_TOO_LONG,
  })
  @Matches(USERNAME_PATTERN, {
    message: AuthError.INVALID_NAME,
  })
  name: string;

  @IsEmail()
  @IsEmailUnique({
    message: AuthError.ALREADY_EXISTS,
  })
  email: string;

  @MinLength(PasswordLength.MIN, {
    message: AuthError.PASSWORD_TOO_SHORT,
  })
  @MaxLength(PasswordLength.MAX, {
    message: AuthError.PASSWORD_TOO_LONG,
  })
  password: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDateString()
  birthday?: Date;

  @IsEnum(UserRole)
  role: UserRole;

  @IsEnum(Location)
  location: Location;
}
