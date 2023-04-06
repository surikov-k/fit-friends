import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RmqService } from '../services';

interface RmqModuleOptions {
  name: string;
}

@Module({
  imports: [],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static registerRmq({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => {
              const USER = configService.get('RABBITMQ_USER');
              const PASSWORD = configService.get('RABBITMQ_PASSWORD');
              const HOST = configService.get('RABBITMQ_HOST');
              const QUEUE = configService.get(`RABBITMQ_${name}_QUEUE`);

              return {
                transport: Transport.RMQ,
                options: {
                  urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                  noAck: true,
                  queue: QUEUE,
                },
              };
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
