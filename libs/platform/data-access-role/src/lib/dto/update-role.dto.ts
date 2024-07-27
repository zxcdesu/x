import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@zxcdesu/prisma-platform';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto
  extends PartialType(CreateRoleDto)
  implements Prisma.RoleUncheckedUpdateInput {}
