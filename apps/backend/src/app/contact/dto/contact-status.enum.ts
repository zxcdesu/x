import { registerEnumType } from '@nestjs/graphql';

export enum ContactStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Resolved = 'Resolved',
  Rejected = 'Rejected',
}

registerEnumType(ContactStatus, {
  name: 'ContactStatus',
});
