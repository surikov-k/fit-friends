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
    this.role = user.role;
  }

  toObject(): UserInterface {
    return { ...this };
  }
}
