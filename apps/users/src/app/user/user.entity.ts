import {
  Gender,
  Profile,
  UserInterface,
  UserRole,
} from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

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
  profile: Profile;
  role: UserRole;

  constructor(user: UserInterface) {
    this.fillEntity(user);
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
    this.profile = user.profile;
    this.role = user.role;
  }

  toObject(): UserInterface {
    return { ...this };
  }
}
