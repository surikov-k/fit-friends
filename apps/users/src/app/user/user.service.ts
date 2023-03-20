import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthError } from '../auth/auth.contstants';
import { UserRepository } from './user.repository';
import { ClientDetailsDto, CoachDetailsDto, UpdateProfileDto } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async get(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }
    return user;
  }

  async getAll() {
    return this.userRepository.findAll();
  }

  async saveClientDetails(userId, dto: ClientDetailsDto) {
    const user = await this.userRepository.findById(userId);
    const entity = new UserEntity(user);
    entity.setClientDetails(dto);

    return this.userRepository.update(userId, entity);
  }

  async saveCoachDetails(userId, dto: CoachDetailsDto) {
    const user = await this.userRepository.findById(userId);
    const entity = new UserEntity(user);
    entity.setCoachDetails(dto);

    return this.userRepository.update(userId, entity);
  }

  async updateProfile(userId, dto: UpdateProfileDto) {
    const user = await this.userRepository.findById(userId);
    const entity = new UserEntity({ ...user, ...dto });
    return this.userRepository.update(userId, entity);
  }
}
