import { Prisma } from '@zxcdesu/prisma-auth';
import { IsEmail } from 'class-validator';

export class CreateInviteDto
  implements Omit<Prisma.InviteUncheckedCreateInput, 'projectId'>
{
  @IsEmail()
  email: string;
}
