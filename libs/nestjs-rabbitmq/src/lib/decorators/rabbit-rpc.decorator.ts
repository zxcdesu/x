import { RabbitRPC as GolevelupRabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Channel, ConsumeMessage } from 'amqplib';

export const RabbitRPC: typeof GolevelupRabbitRPC = (config) =>
  GolevelupRabbitRPC({
    ...config,
    errorHandler: (
      channel: Channel,
      message: ConsumeMessage,
      error?: unknown,
    ) => {
      const { replyTo, correlationId } = message.properties;
      if (replyTo) {
        channel.publish('', replyTo, Buffer.from(JSON.stringify(error)), {
          correlationId,
        });
        channel.ack(message);
      }
    },
  });
