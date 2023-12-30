import { registerEnumType } from '@nestjs/graphql';

export enum ApprovalStatus {
  Submitted = 'Submitted',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

registerEnumType(ApprovalStatus, {
  name: 'ApprovalStatus',
});
