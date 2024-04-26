import { Invite, RoleType } from '@zxcdesu/prisma-account';
import { Exclude } from 'class-transformer';

export class InviteDto implements Invite {
  @Exclude()
  projectId: number;

  email: string;

  roles: RoleType[];
}
