import { Injectable } from '@nestjs/common';
import { AlertRepository } from './alert.repository';
import { AlertInterface } from '@fit-friends/shared-types';

@Injectable()
export class AlertService {
  constructor(private readonly alertRepository: AlertRepository) {}

  public async getByRecipient(recipientId: string): Promise<AlertInterface[]> {
    return this.alertRepository.findByRecipient(recipientId);
  }

  public async delete(id: string): Promise<void> {
    return this.alertRepository.destroy(id);
  }
}
