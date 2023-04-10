import { IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { RmgEnvironmentConfig } from '@fit-friends/core';
import { EnvValidationError } from './app.constants';

class EnvironmentConfig extends RmgEnvironmentConfig {
  constructor() {
    super();
  }
  @IsString({
    message: EnvValidationError.RABBITMQ_QUEUE,
  })
  public RABBITMQ_GYMS_SERVICE_QUEUE: string;
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
