import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { EnvValidationMessage } from '../app.constants';

const MIN_PORT = 0;
const MAX_PORT = 65535;

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired,
  })
  public MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired,
  })
  public MONGO_HOST: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.DBPortRequired,
    }
  )
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired,
  })
  public MONGO_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired,
  })
  public MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired,
  })
  public MONGO_AUTH_BASE: string;

  @IsString({
    message: EnvValidationMessage.JwtATSecretRequired,
  })
  public JWT_AT_SECRET: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.JwtATExpirationRequired,
    }
  )
  public JWT_AT_EXPIRES_IN: number;

  @IsString({
    message: EnvValidationMessage.JwtRTSecretRequired,
  })
  public JWT_RT_SECRET: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.JwtRTExpirationRequired,
    }
  )
  public JWT_RT_EXPIRES_IN: number;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(EnvironmentsConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(environmentsConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
