import { IsEmail } from 'class-validator';
import { Prisma } from '../../prisma.service';
import { CreateProjectUserDto } from '../../project-user/dto/create-project-user.dto';

export class CreateInviteDto
  extends CreateProjectUserDto
  implements Omit<Prisma.InviteUncheckedCreateInput, 'projectId'>
{
  @IsEmail()
  email: string;
}
