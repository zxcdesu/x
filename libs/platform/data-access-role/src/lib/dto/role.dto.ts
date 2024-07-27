import type { Grant, Role } from '@zxcdesu/prisma-platform';
import { Exclude } from 'class-transformer';

export class RoleDto implements Role {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  grants: Grant[];

  createdAt: Date;

  updatedAt: Date;
}
