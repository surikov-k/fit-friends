import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import {
  NotificationEvent,
  SubscriptionInterface,
} from '@fit-friends/shared-types';
import { SubscriptionService } from './subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @EventPattern({ cmd: NotificationEvent.ToggleSubscription })
  public async toggle(@Payload() dto: SubscriptionInterface) {
    return this.subscriptionService.toggle(dto);
  }
}
