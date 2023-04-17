import { Injectable } from '@nestjs/common';

import { SubscriberInterface } from '@fit-friends/shared-types';
import { SubscriptionRepository } from './subscription.repository';
import { MailService } from '../mail/mail.service';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriptionRepository,
    private readonly mailService: MailService
  ) {}

  public async addSubscriber(dto: SubscriberInterface) {
    const { email } = dto;
    const subscriber = await this.subscriberRepository.findByEmail(email);
  }
}
