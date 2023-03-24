import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { EnvValidationMessage } from './app.constants';
import { plainToInstance } from 'class-transformer';

const MIN_PORT = 0;
const MAX_PORT = 65535;

class EnvironmentConfig {
  @IsNumber(
    {},
    {
      message: EnvValidationMessage.ServerPortRequired,
    }
  )
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public PORT: number;

  @IsString({
    message: EnvValidationMessage.JwtATSecretRequired,
  })
  public JWT_AT_SECRET: string;
}

export function validateEnvironment(config: Record<string, unknown>) {
  const environmentConfig = plainToInstance(EnvironmentConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(environmentConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentConfig;
}
