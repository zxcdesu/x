import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Provider, Type } from '@nestjs/common';
import { ErrorFactory } from './interfaces';

export class RmqService {
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
        error?: any;
      }
    >(...args);
    if (payload.error) {
      throw this.errorFactory.errorFactory(payload.error);
    }
    return payload;
  }

  protected publish(...args: Parameters<AmqpConnection['publish']>) {
    return this.amqpConnection.publish(...args);
  }
}
