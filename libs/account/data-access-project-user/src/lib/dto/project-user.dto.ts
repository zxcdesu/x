import { UserDto } from '@zxcdesu/data-access-user';
import { RoleType } from '@zxcdesu/prisma-account';
import { Type } from 'class-transformer';

export class ProjectUserDto {
  @Type(() => UserDto)
  user: UserDto;

  roles: RoleType[];
}
