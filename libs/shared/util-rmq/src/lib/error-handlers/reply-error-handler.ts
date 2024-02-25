import type { Channel, ConsumeMessage } from 'amqplib';

export const replyErrorHandler = (
  channel: Channel,
  message: ConsumeMessage,
  error: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const { replyTo, correlationId } = message.properties;
  if (replyTo) {
    error.status = 'error';
    channel.publish('', replyTo, Buffer.from(JSON.stringify(error)), {
      correlationId,
    });
    channel.ack(message);
  }
};
