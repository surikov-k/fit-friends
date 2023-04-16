import { Injectable } from '@nestjs/common';

import { SubscriberInterface } from '@fit-friends/shared-types';
import { SubscriberRepository } from './subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(private readonly subscriberRepository: SubscriberRepository) {}
  public async addSubscriber(dto: SubscriberInterface) {
    const { email } = dto;
    const subscriber = await this.subscriberRepository.findByEmail(email);
  }
}
