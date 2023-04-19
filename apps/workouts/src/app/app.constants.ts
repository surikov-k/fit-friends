export const ENV_FILE_PATH = 'environments/.workouts.env';
export const RABBITMQ_ENV_FILE_PATH = 'environments/.rabbitmq.env';

export const WORKOUTS_LIST_SORT_BY_PRICE_DEFAULT = 'desc';

export enum EnvValidationMessage {
  RABBITMQ_QUEUE = 'RabbitMQ queue name required',
}
