import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import {
  NotificationEvent,
  SubscriberInterface,
} from '@fit-friends/shared-types';

@Controller()
export class SubscriptionController {
  @EventPattern({ cmd: NotificationEvent.AddSubscriber })
  public async createSubscriber(dto: SubscriberInterface) {}
}
