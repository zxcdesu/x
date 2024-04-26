import { Prisma, RoleType } from '@zxcdesu/prisma-account';
import { Transform } from 'class-transformer';
import { ArrayMinSize, IsEmail, IsEnum } from 'class-validator';

export class CreateInviteDto
  implements Omit<Prisma.InviteUncheckedCreateInput, 'projectId'>
{
  @IsEmail()
  email: string;

  @Transform(({ value }) => value && Array.from(new Set(value).values()))
  @IsEnum(RoleType, { each: true })
  @ArrayMinSize(1)
  roles: RoleType[];
}
