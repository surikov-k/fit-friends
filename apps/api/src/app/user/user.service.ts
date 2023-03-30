import { Inject, Injectable } from '@nestjs/common';
import {
  ClientDetailsDto,
  CoachDetailsDto,
  UpdateProfileDto,
} from '@fit-friends/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserEvent, UserInterface } from '@fit-friends/shared-types';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ) {}

  async get(userId) {
    return firstValueFrom(
      this.userService.send<UserInterface>(
        { cmd: UserEvent.GetUser },
        { userId }
      )
    );
  }

  async getAll() {
    return firstValueFrom(
      this.userService.send<UserInterface[]>({ cmd: UserEvent.GetAll }, {})
    );
  }

  async saveClientDetails(userId, dto: ClientDetailsDto) {
    return firstValueFrom(
      this.userService.send<UserInterface>(
        { cmd: UserEvent.SaveClientDetails },
        { userId, dto }
      )
    );
  }

  async saveCoachDetails(userId, dto: CoachDetailsDto) {
    return firstValueFrom(
      this.userService.send<UserInterface>(
        { cmd: UserEvent.SaveCoachDetails },
        { userId, dto }
      )
    );
  }

  async updateProfile(userId, dto: UpdateProfileDto) {
    return firstValueFrom(
      this.userService.send<UserInterface>(
        { cmd: UserEvent.UpdateProfile },
        { userId, dto }
      )
    );
  }

  async toggleFriend(friendId: string, userId: string) {
    return firstValueFrom(
      this.userService.send<UserInterface>(
        { cmd: UserEvent.ToggleFriend },
        { friendId, userId }
      )
    );
  }

  async getFriends(userId: string) {
    return firstValueFrom(
      this.userService.send<UserInterface[]>(
        { cmd: UserEvent.GetFriends },
        { userId }
      )
    );
  }
}
