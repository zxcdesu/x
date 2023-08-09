import { Invite } from '../../../../prisma/generated';

export class InviteDto implements Invite {
  email: string;

  projectId: number;
}
