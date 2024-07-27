import { Grant, Prisma } from '@zxcdesu/prisma-platform';
import { Trim } from '@zxcdesu/util-transformer';
import { IsEnum, IsString, Length } from 'class-validator';

export class CreateRoleDto
  implements Omit<Prisma.RoleUncheckedCreateInput, 'projectId'>
{
  @Trim()
  @IsString()
  @Length(1, 120)
  name: string;

  @IsEnum(Grant, { each: true })
  grants: Grant[];
}
