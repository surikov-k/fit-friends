import { Injectable } from '@nestjs/common';
import { AlertRepository } from './alert.repository';
import { AlertInterface } from '@fit-friends/shared-types';
import { AlertEntity } from './alert.entity';

@Injectable()
export class AlertService {
  constructor(private readonly alertRepository: AlertRepository) { }

  public async get(id: string): Promise<AlertInterface | null> {
    return this.alertRepository.findById(id);
  }

  public async create(
    recipientId: string,
    text: string
  ): Promise<AlertInterface> {
    const entity = new AlertEntity({ recipientId, text });
    return this.alertRepository.create(entity);
  }

  public async getByRecipient(recipientId: string): Promise<AlertInterface[]> {
    return this.alertRepository.findByRecipient(recipientId);
  }

  public async delete(id: string): Promise<{ acknowledged: boolean, deletedCount: number }> {
    return this.alertRepository.destroy(id);
  }
}
