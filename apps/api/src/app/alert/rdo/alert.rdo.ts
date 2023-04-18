import { AlertInterface } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class AlertRdo implements AlertInterface {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  text: string;

  recipientId: string;
}
