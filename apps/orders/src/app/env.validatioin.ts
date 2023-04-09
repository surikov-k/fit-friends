import { IsString, validateSync } from 'class-validator';
import { EnvValidationMessage } from './app.constants';
import { plainToInstance } from 'class-transformer';
import { RmgEnvironmentConfig } from '@fit-friends/core';

const MIN_PORT = 0;
const MAX_PORT = 65535;

class EnvironmentConfig extends RmgEnvironmentConfig {
  constructor() {
    super();
  }

  @IsString({
    message: EnvValidationMessage.RABBITMQ_QUEUE,
  })
  public RABBITMQ_ORDERS_SERVICE_QUEUE: string;
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
