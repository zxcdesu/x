import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from '.';
import { ERROR_FACTORY } from './constants';
import { Options } from './interfaces';

@Module({})
export class RmqModule {
  static register({ errorFactory }: Options): DynamicModule {
    return {
      imports: [RabbitMQModule],
      module: RmqModule,
      providers: [
        RmqService,
        {
          provide: ERROR_FACTORY,
          useValue: errorFactory,
        },
      ],
      exports: [RmqService],
    };
  }
}
