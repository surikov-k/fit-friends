export const ENV_FILE_PATH = 'environments/.workouts.env';

export enum EnvValidationMessage {
  ServerPortRequired = 'Server port is required',
  JwtATSecretRequired = 'JWT secret is required',
}
