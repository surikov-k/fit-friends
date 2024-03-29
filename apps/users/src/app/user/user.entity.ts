import { compare, genSalt, hash } from 'bcrypt';

import {
  ClientInterface,
  CoachInterface,
  Gender,
  Location,
  Skill,
  TimeSpan,
  UserInterface,
  UserRole,
  WorkoutType,
} from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';
import { SALT_ROUNDS } from './user.constants';

export class UserEntity
  implements UserInterface, EntityInterface<UserInterface>
{
  _id?: string;
  avatar: string;
  birthday?: Date;
  createdAt: Date;
  email: string;
  gender: Gender;
  location: Location;
  name: string;
  passwordHash: string;
  role: UserRole;
  skill: Skill;
  trainings: WorkoutType[];
  duration: TimeSpan;
  caloriesTarget: number;
  caloriesPerDay: number;
  readiness: boolean;
  hasPersonalTrainings: boolean;
  achievements: string;
  info: string;
  refreshTokenHash: string;
  friends?: string[] = [];
  certificates: string[] = [];

  constructor(user: UserInterface) {
    this.fillEntity(user);
  }

  public setClientDetails(dto: ClientInterface) {
    this.skill = dto.skill;
    this.trainings = dto.trainings;
    this.duration = dto.duration;
    this.caloriesTarget = dto.caloriesTarget;
    this.caloriesPerDay = dto.caloriesPerDay;
    this.readiness = dto.readiness;
    this.info = dto.info;
  }

  public setCoachDetails(dto: CoachInterface) {
    this.skill = dto.skill;
    this.trainings = dto.trainings;
    this.hasPersonalTrainings = dto.hasPersonalTrainings;
    this.achievements = dto.achievements;
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
    this.refreshTokenHash = await hash(rtToken, salt);
    return this;
  }

  public async compareRefreshToken(rtToken: string): Promise<boolean> {
    return compare(rtToken, this.refreshTokenHash);
  }

  public clearRefreshTokenHash() {
    this.refreshTokenHash = null;
    return this;
  }

  public toggleFriend(toggleFriendId: string) {
    const alreadyFriendId = this.friends.find(
      (friendId) => friendId === toggleFriendId
    );

    if (alreadyFriendId) {
      this.friends = this.friends.filter(
        (friendId) => friendId !== alreadyFriendId
      );
    } else {
      this.friends.push(toggleFriendId);
    }
  }

  fillEntity(user): void {
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
    this.skill = user.skill;
    this.trainings = user.trainings;
    this.duration = user.duration;
    this.caloriesTarget = user.caloriesTarget;
    this.caloriesPerDay = user.caloriesPerDay;
    this.readiness = user.readiness;
    this.hasPersonalTrainings = user.hasPersonalTrainings;
    this.achievements = user.achievements;
    this.info = user.info;
    this.refreshTokenHash = user.refreshTokenHash;
    // this.friends = user.friends ? user.friends : [];
    // this.certificates = user.certificates ? user.certificates : [];
    this.friends = user.friends;
    this.certificates = user.certificates;
  }

  toObject(): UserInterface {
    return { ...this };
  }
}
