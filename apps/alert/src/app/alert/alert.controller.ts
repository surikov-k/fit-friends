import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { AlertEvent } from '@fit-friends/shared-types';
import { AlertService } from './alert.service';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @EventPattern({ cmd: AlertEvent.Get })
  public async get(@Payload() { id }: { id: string }) {
    return this.alertService.get(id);
  }

  @EventPattern({ cmd: AlertEvent.GetByRecipient })
  public async getByRecipient(
    @Payload() { recipientId }: { recipientId: string }
  ) {
    return this.alertService.getByRecipient(recipientId);
  }

  @EventPattern({ cmd: AlertEvent.Delete })
  public async delete(@Payload() id: string) {
    return this.alertService.delete(id);
  }
}
