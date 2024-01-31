import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  handle(exchange: string, body: unknown, routingKey = 'handleWebhook') {
    this.amqpConnection
      .publish(exchange, routingKey, body)
      .catch(this.logger.error.bind(this.logger));
    return 'ok';
  }
}
