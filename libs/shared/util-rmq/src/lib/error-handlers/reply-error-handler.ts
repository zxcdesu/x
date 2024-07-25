import type { Channel, ConsumeMessage } from 'amqplib';

export const replyErrorHandler = (
  channel: Channel,
  message: ConsumeMessage,
) => {
  const { replyTo, correlationId } = message.properties;
  if (replyTo) {
    channel.publish('', replyTo, message.content, {
      correlationId,
    });
    channel.ack(message);
  }
};
