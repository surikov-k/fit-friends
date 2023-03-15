import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { Profile, UserRole } from '@fit-friends/shared-types';
import { ClientProfileEntity } from './client-profile.entity';
import { CoachProfileEntity } from './coach-profile.entity';
import { ClientProfile } from './client-profile.model';
import { CoachProfile } from './coach-profile.model';

@Injectable()
export class ProfileRepository
  implements CrudRepositoryInterface<Profile, string, Profile>
{
  constructor(
    @InjectModel(ClientProfile.name)
    private readonly clientProfile: Model<ClientProfile>,
    @InjectModel(CoachProfile.name)
    private readonly coachProfile: Model<CoachProfile>
  ) {}

  public async findById(id: string): Promise<Profile> {
    throw new Error('Method not implemented.');
  }

  public async create(
    entity: ClientProfileEntity | CoachProfileEntity
  ): Promise<Profile> {
    let profile;

    if (entity instanceof ClientProfileEntity) {
      profile = new this.clientProfile(entity);
      profile.__type = UserRole.Client;
    }

    if (entity instanceof CoachProfileEntity) {
      profile = new this.coachProfile(entity);
      profile.__type = UserRole.Coach;
    }

    return profile.save();
  }

  public async update(id: string, item: Profile): Promise<Profile> {
    throw new Error('Method not implemented.');
  }

  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
