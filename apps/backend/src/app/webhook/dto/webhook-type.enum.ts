import { registerEnumType } from '@nestjs/graphql';

export enum WebhookType {
  ChatEvent = 'ChatEvent',
  MessageEvent = 'MessageEvent',
}

registerEnumType(WebhookType, {
  name: 'WebhookType',
});
