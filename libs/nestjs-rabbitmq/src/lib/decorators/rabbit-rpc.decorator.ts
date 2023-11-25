import { RabbitRPC as GolevelupRabbitRPC } from '@golevelup/nestjs-rabbitmq';

export const RabbitRPC: typeof GolevelupRabbitRPC = (config) =>
  GolevelupRabbitRPC({
    ...config,
    errorHandler: (channel, message, error) => {
      const { replyTo, correlationId } = message.properties;
      if (replyTo) {
        channel.publish(
          '',
          replyTo,
          Buffer.from(
            JSON.stringify(
              Object.assign(error, {
                error: true,
              }),
              Object.getOwnPropertyNames(error),
            ),
          ),
          {
            correlationId,
          },
        );
        channel.ack(message);
      }
    },
  });
