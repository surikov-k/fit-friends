import { AlertInterface } from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

export class AlertEntity
  implements AlertInterface, EntityInterface<AlertInterface>
{
  _id?: string;
  createdAt: Date;
  recipientId: string;
  text: string;

  constructor(alert: AlertInterface) {
    this.fillEntity(alert);
  }

  fillEntity(alert: AlertInterface): void {
    this.createdAt = alert.createdAt;
    this.recipientId = alert.recipientId;
    this.text = alert.text;
  }

  toObject(): AlertInterface {
    return { ...this };
  }
}
