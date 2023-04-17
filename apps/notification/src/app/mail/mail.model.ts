import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

import { MailInterface, MailStatus } from '@fit-friends/shared-types';

export class MailModel extends Document implements MailInterface {
  @Prop()
  to: string;

  @Prop()
  subject: string;

  @Prop()
  template: string;

  @Prop()
  context?: object;

  @Prop()
  status: MailStatus;
}
