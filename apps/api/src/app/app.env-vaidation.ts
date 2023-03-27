import { IsNumber, Max, Min, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { EnvValidationError } from './app.constants';

enum Port {
  MIN = 0,
  MAX = 65535,
}

class EnvironmentConfig {
  @IsNumber(
    {},
    {
      message: EnvValidationError.API_PORT_REQUIRED,
    }
  )
  @Min(Port.MIN)
  @Max(Port.MAX)
  public PORT: number;
}

export function validateEnvironment(config: Record<string, unknown>) {
  const envConfig = plainToInstance(EnvironmentConfig, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(envConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return envConfig;
}
