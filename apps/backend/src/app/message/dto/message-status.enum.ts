import { registerEnumType } from '@nestjs/graphql';

export enum MessageStatus {
  Submitted = 'Submitted',
  Delivered = 'Delivered',
  Read = 'Read',
  Failed = 'Failed',
}

registerEnumType(MessageStatus, {
  name: 'MessageStatus',
});
