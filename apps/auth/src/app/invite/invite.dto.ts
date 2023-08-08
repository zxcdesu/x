import { IsEmail, IsInt } from 'class-validator';
import { Prisma, Invite } from '../../../prisma/generated';

export class CreateInviteDto implements Prisma.InviteUncheckedCreateInput {
  @IsEmail()
  email: string;

  @IsInt()
  projectId: number;
}

export class InviteDto implements Invite {
  email: string;

  projectId: number;
}
