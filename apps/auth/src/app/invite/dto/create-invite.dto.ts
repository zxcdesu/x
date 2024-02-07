import { IsEmail, IsInt } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateInviteDto implements Prisma.InviteUncheckedCreateInput {
  @IsEmail()
  email: string;

  @IsInt()
  projectId: number;
}
