import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Injectable } from '@nestjs/common';

import {
  ClientInterface,
  CoachInterface,
  UpdateProfileInterface,
} from '@fit-friends/shared-types';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { AuthError } from '../app.constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async get(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: AuthError.NOT_FOUND,
      });
    }
    return user;
  }

  async getAll() {
    return this.userRepository.findAll();
  }

  async saveClientDetails(userId, dto: ClientInterface) {
    const user = await this.userRepository.findById(userId);
    const entity = new UserEntity(user);
    entity.setClientDetails(dto);

    return this.userRepository.update(userId, entity);
  }

  async saveCoachDetails(userId, dto: CoachInterface) {
    const user = await this.userRepository.findById(userId);
    const entity = new UserEntity(user);
    entity.setCoachDetails(dto);

    return this.userRepository.update(userId, entity);
  }

  async updateProfile(userId, dto: UpdateProfileInterface) {
    const user = await this.userRepository.findById(userId);
    const entity = new UserEntity({ ...user, ...dto });
    return this.userRepository.update(userId, entity);
  }

  async toggleFriend(friendId, userId) {
    const user = await this.userRepository.findById(userId);
    const entity = new UserEntity(user);
    entity.toggleFriend(friendId);
    return this.userRepository.update(userId, entity);
  }

  async getFriends(userId) {
    const user = await this.userRepository.findById(userId);

    return this.userRepository.findMany(user.friends);
  }
}
