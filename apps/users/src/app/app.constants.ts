export const ENV_FILE_PATH = 'environments/.users.env';
export const RABBITMQ_ENV_FILE_PATH = 'environments/.rabbitmq.env';

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  JwtATSecretRequired = 'Jwt Access token secret is required',
  JwtATExpirationRequired = 'Jwt Access token expiration time is required',
  JwtRTSecretRequired = 'Jwt Refresh token secret is required',
  JwtRTExpirationRequired = 'Jwt Refresh token expiration time is required',
}
export enum AuthError {
  NOT_FOUND = 'User not found',
  WRONG_CREDENTIALS = 'Wrong email or password',
}
