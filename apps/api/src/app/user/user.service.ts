import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  NotificationEvent,
  SubscriptionInterface,
  SubscriptionType,
  UserEvent,
  UserInterface,
} from '@fit-friends/shared-types';
import { ClientDetailsDto, CoachDetailsDto, UpdateProfileDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationService: ClientProxy,
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

  async toggleSubscription(clientId, coachId) {
    const { name: clientName, email } = await firstValueFrom(
      this.userService.send<UserInterface>(
        { cmd: UserEvent.GetUser },
        { userId: clientId }
      )
    );

    const { name: coachName } = await firstValueFrom(
      this.userService.send<UserInterface>(
        { cmd: UserEvent.GetUser },
        { userId: coachId }
      )
    );

    const subscriptionDto: SubscriptionInterface = {
      clientId,
      clientName,
      coachId,
      coachName,
      email,
      type: SubscriptionType.NewWorkout,
    };

    return firstValueFrom(
      this.notificationService.send(
        { cmd: NotificationEvent.ToggleSubscription },
        { subscriptionDto }
      )
    );
  }
}
