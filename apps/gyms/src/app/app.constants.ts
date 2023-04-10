export const ENV_FILE_PATH = 'environments/.gyms.env';
export const RABBITMQ_ENV_FILE_PATH = 'environments/.rabbitmq.env';

export enum EnvValidationError {
  RABBITMQ_QUEUE = 'RabbitMQ queue name required',
}
