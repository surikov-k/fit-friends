export const ENV_FILE_PATH = 'environments/.orders.env';
export const RABBITMQ_ENV_FILE_PATH = 'environments/.rabbitmq.env';

export enum EnvValidationMessage {
  RABBITMQ_QUEUE = 'RabbitMQ queue name required',
}
