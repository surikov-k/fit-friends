import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
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
  @ApiProperty({
    description: 'User name',
    example: 'Дарья',
  })
  @MinLength(UsernameLength.MIN, {
    message: AuthError.NAME_TOO_SHORT,
    always: true,
  })
  @MaxLength(UsernameLength.MAX, {
    message: AuthError.NAME_TOO_LONG,
  })
  @Matches(USERNAME_PATTERN, {
    message: AuthError.INVALID_NAME,
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'callie.ray@example.com',
  })
  @IsEmail()
  @IsEmailUnique({
    message: AuthError.ALREADY_EXISTS,
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @MinLength(PasswordLength.MIN, {
    message: AuthError.PASSWORD_TOO_SHORT,
  })
  @MaxLength(PasswordLength.MAX, {
    message: AuthError.PASSWORD_TOO_LONG,
  })
  password: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Female',
  })
  @IsEnum(Gender, { always: true })
  gender: Gender;

  @ApiProperty({
    description: 'User birthday',
    example: '1988-04-11',
  })
  @IsDateString({}, { always: true })
  @IsOptional()
  birthday?: Date;

  @ApiProperty({
    description: 'User role',
    example: 'Coach',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'User location',
    example: 'Удельная',
  })
  @IsEnum(Location, { always: true })
  location: Location;

  @ApiProperty({
    description: 'User location',
    example: 'Удельная',
  })
  @IsString({ always: true })
  @IsOptional()
  avatar: string;
}
