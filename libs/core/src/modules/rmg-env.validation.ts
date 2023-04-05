import { IsString } from 'class-validator';
import { RmqEnvValidationMessage } from './rmq.contstants';

export class RmgEnvironmentConfig {
  @IsString({
    message: RmqEnvValidationMessage.RMQUserRequired,
  })
  public RABBITMQ_USER: string;

  @IsString({
    message: RmqEnvValidationMessage.RMQPasswordRequired,
  })
  public RABBITMQ_PASSWORD: string;

  @IsString({
    message: RmqEnvValidationMessage.RMQHostRequired,
  })
  public RABBITMQ_HOST: string;
}
