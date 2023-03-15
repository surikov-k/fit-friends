import { compare, genSalt, hash } from 'bcrypt';

import {
  Gender,
  Location,
  UserInterface,
  UserRole,
} from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';
import { SALT_ROUNDS } from './user.constants';

export class UserEntity
  implements UserInterface, EntityInterface<UserInterface>
{
  _id: string;
  avatar: string;
  birthday: Date;
  createdAt: Date;
  email: string;
  gender: Gender;
  location: Location;
  name: string;
  passwordHash: string;
  role: UserRole;
  rtHash: string;
  profile: string;

  constructor(user: UserInterface) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePasswords(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public async setRefreshTokenHash(rtToken: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.rtHash = await hash(rtToken, salt);
    return this;
  }

  public async compareRefreshToken(rtToken: string): Promise<boolean> {
    return compare(rtToken, this.rtHash);
  }

  public clearRefreshTokenHash() {
    this.rtHash = null;
    return this;
  }

  fillEntity(user: UserInterface): void {
    this._id = user._id;
    this.avatar = user.avatar;
    this.birthday = user.birthday;
    this.createdAt = user.createdAt;
    this.email = user.email;
    this.gender = user.gender;
    this.location = user.location;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.rtHash = user.rtHash;
    this.role = user.role;
    this.profile = user.profile;
  }

  toObject(): UserInterface {
    return { ...this };
  }
}
