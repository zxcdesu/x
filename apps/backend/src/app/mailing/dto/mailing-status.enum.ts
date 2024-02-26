import { registerEnumType } from '@nestjs/graphql';

export enum MailingStatus {
  Disabled = 'Disabled',
  Scheduled = 'Scheduled',
  Active = 'Active',
  Finished = 'Finished',
  Failed = 'Failed',
}

registerEnumType(MailingStatus, {
  name: 'MailingStatus',
});
