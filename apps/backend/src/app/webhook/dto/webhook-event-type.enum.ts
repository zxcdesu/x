import { registerEnumType } from '@nestjs/graphql';

export enum WebhookEventType {
  ChatEvent = 'ChatEvent',
  MessageEvent = 'MessageEvent',
}

registerEnumType(WebhookEventType, {
  name: 'WebhookEventType',
});
