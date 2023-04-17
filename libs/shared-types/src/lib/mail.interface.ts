import { MailStatus } from './mail-status.enum';

export interface MailInterface {
  id?: string;
  to: string;
  subject: string;
  template: string;
  context?: object;
  status: MailStatus;
}
