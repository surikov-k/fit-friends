import { Injectable } from '@nestjs/common';

import { SubscriptionInterface } from '@fit-friends/shared-types';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionEntity } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  public async toggle(dto: SubscriptionInterface) {
    const { clientId, coachId } = dto;
    const subscription = await this.subscriptionRepository.findByClientAndCoach(
      clientId,
      coachId
    );

    if (subscription) {
      return this.subscriptionRepository.destroy(subscription.id);
    }

    const entity = new SubscriptionEntity(dto);

    return this.subscriptionRepository.create(entity);
  }

  public async findByCoachId(
    coachId: string
  ): Promise<SubscriptionInterface[]> {
    return this.subscriptionRepository.findByCoachId(coachId);
  }
}
