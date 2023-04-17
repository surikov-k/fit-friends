import { MailInterface, MailStatus } from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

export class MailEntity
  implements MailInterface, EntityInterface<MailInterface>
{
  _id?: string;
  to: string;
  subject: string;
  template: string;
  status: MailStatus;
  context: object;

  constructor(mail: MailInterface) {
    this.fillEntity(mail);
  }

  fillEntity(mail: MailInterface): void {
    this._id = mail._id;
    this.to = mail.to;
    this.subject = mail.subject;
    this.template = mail.template;
    this.status = MailStatus.Pending;
    this.context = {};
  }

  changeStatus() {
    this.status = MailStatus.Sent;
  }

  toObject(): MailInterface {
    return { ...this };
  }
}
