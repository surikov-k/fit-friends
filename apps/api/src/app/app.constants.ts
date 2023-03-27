export const ENV_FILE_PATH = 'environments/.api.env';
export const RABBITMQ_ENV_FILE_PATH = 'environments/.rabbitmq.env';

export enum EnvValidationError {
  API_PORT_REQUIRED = 'Api port is required',
}
