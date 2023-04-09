import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import {
  ClientInterface,
  CoachInterface,
  UpdateProfileInterface,
  UserEvent,
} from '@fit-friends/shared-types';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: UserEvent.GetUser })
  public async get(@Payload() { id }: { id: string }) {
    return this.userService.get(id);
  }

  @MessagePattern({ cmd: UserEvent.SaveClientDetails })
  public async saveClientDetails(
    @Payload() { dto, userId }: { dto: ClientInterface; userId: string }
  ) {
    return this.userService.saveClientDetails(userId, dto);
  }

  @MessagePattern({ cmd: UserEvent.SaveCoachDetails })
  public async saveCoachDetails(
    @Payload() { dto, userId }: { dto: CoachInterface; userId: string }
  ) {
    return this.userService.saveCoachDetails(userId, dto);
  }

  @MessagePattern({ cmd: UserEvent.UpdateProfile })
  public async updateProfile(
    @Payload() { dto, userId }: { dto: UpdateProfileInterface; userId: string }
  ) {
    return this.userService.updateProfile(userId, dto);
  }

  @MessagePattern({ cmd: UserEvent.GetAll })
  public async getAll() {
    return this.userService.getAll();
  }

  @MessagePattern({ cmd: UserEvent.ToggleFriend })
  public async toggleFriend(
    @Payload() { friendId, userId }: { friendId: string; userId: string }
  ) {
    return this.userService.toggleFriend(friendId, userId);
  }

  @MessagePattern({ cmd: UserEvent.GetFriends })
  public async getFriends(@Payload() { userId }: { userId: string }) {
    return this.userService.getFriends(userId);
  }
}
