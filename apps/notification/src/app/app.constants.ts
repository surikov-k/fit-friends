export const ENV_FILE_PATH = 'environments/.notification.env';
export const RABBITMQ_ENV_FILE_PATH = 'environments/.rabbitmq.env';

export enum EnvValidationMessage {
  RabbitMqQueue = 'RabbitMQ queue name required',
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  MailServerHostRequired = 'SMTP Server is required',
  MailServerUserNameRequired = 'SMTP Server user name is required',
  MailServerPasswordRequired = 'SMTP Server password is required',
  MailServerDefaultFromRequired = 'Default value for mail from field is required',
  MailServerPortRequired = 'SMTP Server port is required',
}
