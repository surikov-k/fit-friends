export const ENV_FILE_PATH = 'environments/.nutrition.env';
export const RABBITMQ_ENV_FILE_PATH = 'environments/.rabbitmq.env';

export enum EnvValidationError {
  RABBITMQ_QUEUE = 'RabbitMQ queue name required',
}
