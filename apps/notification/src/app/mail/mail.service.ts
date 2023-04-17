import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { WorkoutInterface } from '@fit-friends/shared-types';
import { SubscriptionService } from '../subscription/subscription.service';
import { MailEntity } from './mail.entity';
import {
  NEW_WORKOUT_EMAIL_SUBJECT,
  NEW_WORKOUT_EMAIL_TEMPLATE,
} from '../app.constants';
import { MailRepository } from './mail.repository';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailRepository: MailRepository,
    private readonly subscriptionService: SubscriptionService
  ) {}

  public async send() {
    const pendingMails = await this.mailRepository.findPending();
    await Promise.all(
      pendingMails.map(async (mail) => {
        await this.mailerService.sendMail(mail);
        const entity = new MailEntity(mail);
        entity.changeStatus();
        await this.mailRepository.update(mail._id, entity);
      })
    );
  }

  public async createDelivery(workout: WorkoutInterface) {
    const { coachId, title } = workout;
    const subscriptions = await this.subscriptionService.findByCoachId(coachId);

    const mails = subscriptions.map(
      async ({ email, clientName, coachName }) => {
        const entity = new MailEntity({
          to: email,
          subject: NEW_WORKOUT_EMAIL_SUBJECT,
          template: NEW_WORKOUT_EMAIL_TEMPLATE,
          context: {
            title,
            userName: clientName,
            coachName: coachName,
          },
        });

        return this.mailRepository.create(entity);
      }
    );

    return Promise.all(mails);
  }
}
