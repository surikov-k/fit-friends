import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { MailEvent, WorkoutInterface } from '@fit-friends/shared-types';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern({ cmd: MailEvent.CreateDelivery })
  public async createDelivery(
    @Payload() { workout }: { workout: WorkoutInterface }
  ) {
    return this.mailService.createDelivery(workout);
  }
}
