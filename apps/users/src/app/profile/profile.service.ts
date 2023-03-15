import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { CreateClientProfileDto, CreateCoachProfileDto } from './dto';
import { ClientProfileEntity } from './client-profile.entity';
import { CoachProfileEntity } from './coach-profile.entity';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async createClientProfile(
    dto: CreateClientProfileDto,
    userId: string
  ) {
    const user = await this.userRepository.findById(userId);
    const entity = new ClientProfileEntity({ ...dto, userId });
    const profile = await this.profileRepository.create(entity);
    const userEntity = new UserEntity(user);
    userEntity.profile = profile._id;
    await this.userRepository.update(userId, userEntity);

    return profile;
  }

  public async createCoachProfile(dto: CreateCoachProfileDto) {
    const entity = new CoachProfileEntity(dto);
    return this.profileRepository.create(entity);
  }
}
