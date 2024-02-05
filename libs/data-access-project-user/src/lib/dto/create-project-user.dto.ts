import { Prisma, RoleType } from '@zxcdesu/prisma-auth';
import { ArrayMinSize, IsEnum, IsOptional } from 'class-validator';

export class CreateProjectUserDto
  implements
    Omit<Prisma.ProjectUserUncheckedCreateInput, 'projectId' | 'userId'>
{
  @IsOptional()
  @IsEnum(RoleType, { each: true })
  @ArrayMinSize(1)
  roles?: RoleType[];
}
