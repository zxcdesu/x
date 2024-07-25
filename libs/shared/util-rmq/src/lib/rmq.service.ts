import {
  AmqpConnection,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import {
  applyDecorators,
  Provider,
  Type,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorFactory } from './error-factory.interface';
import { ResponseInterceptor } from './interceptors/response.interceptor';

export class RmqFactory {
  static rpc: typeof RabbitRPC = (config) =>
    applyDecorators(RabbitRPC(config), UseInterceptors(ResponseInterceptor));

  static subscribe = RabbitSubscribe;

  static provide(errorFactory: Type<ErrorFactory>): Provider {
    return {
      provide: this,
      useFactory: (
        amqpConnection: AmqpConnection,
        errorFactory: ErrorFactory,
      ) => new this(amqpConnection, errorFactory),
      inject: [AmqpConnection, errorFactory],
    };
  }

  protected constructor(
    protected readonly amqpConnection: AmqpConnection,
    private readonly errorFactory: ErrorFactory,
  ) {}

  protected async request<T>(
    ...args: Parameters<AmqpConnection['request']>
  ): Promise<T> {
    const response = await this.amqpConnection.request<
      T & {
        status?: 'error';
      }
    >(...args);

    if ('error' in response) {
      throw this.errorFactory.errorFactory(response.error);
    }

    return response;
  }

  protected publish(...args: Parameters<AmqpConnection['publish']>) {
    return this.amqpConnection.publish(...args);
  }
}
