import { RoleDto } from '@zxcdesu/data-access-role';
import type { RoleUser } from '@zxcdesu/prisma-platform';
import { Exclude, Type } from 'class-transformer';

export class RoleUserDto implements RoleUser {
  @Exclude()
  roleId: number;

  @Type(() => RoleDto)
  role: RoleDto;

  userId: number;
}
