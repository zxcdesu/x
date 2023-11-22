import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Provider, Type } from '@nestjs/common';
import { ErrorFactory } from './interfaces/error-factory.interface';
import { RabbitRPC } from './decorators/rabbit-rpc.decorator';

export class RmqService {
  static rpc = RabbitRPC;
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
    const payload = await this.amqpConnection.request<
      T & {
        exception?: any;
      }
    >(...args);
    if (payload?.exception) {
      throw this.errorFactory.errorFactory(payload.exception);
    }
    return payload;
  }

  protected publish(...args: Parameters<AmqpConnection['publish']>) {
    return this.amqpConnection.publish(...args);
  }
}