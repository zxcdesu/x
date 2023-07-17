import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { BearerAuth } from './bearer-auth.interface';

@Injectable()
export class BearerAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super();
  }

  async validate(token: string): Promise<BearerAuth> {
    const { error, payload } = await this.amqpConnection.request<{
      error: unknown;
      payload: BearerAuth;
    }>({
      exchange: 'auth',
      routingKey: 'validateToken',
      payload: {
        token,
      },
    });
    if (error) {
      throw error;
    }
    return payload;
  }
}
