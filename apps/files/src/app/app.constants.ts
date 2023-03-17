export const ENV_FILE_PATH = 'environments/.files.env';

export const MIN_PORT = 0;
export const MAX_PORT = 65535;

export enum EnvValidationMessage {
  PortRequired = 'Server port is required',
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  JwtATSecretRequired = 'Jwt Access token secret is required',
  UploadDirRequired = 'Path to uploads directory is required',
}
