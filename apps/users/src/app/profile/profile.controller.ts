import { Body, Controller, Post } from '@nestjs/common';

import { CreateClientProfileDto, CreateCoachProfileDto } from './dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/client')
  async createClientProfile(@Body() dto: CreateClientProfileDto) {
    const userId = '640ce2b438e63f163caf07ec';
    const profile = await this.profileService.createClientProfile(dto, userId);
    return profile;
  }

  @Post('/coach')
  async createCoachProfile(@Body() dto: CreateCoachProfileDto) {
    const profile = await this.profileService.createCoachProfile(dto);
    return profile;
  }
}
