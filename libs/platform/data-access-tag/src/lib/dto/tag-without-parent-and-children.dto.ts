import { Tag } from '@zxcdesu/prisma-platform';
import { Exclude } from 'class-transformer';

export class TagWithoutParentAndChildrenDto implements Tag {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  description: string;

  color: string;

  @Exclude()
  parentId: number | null;

  createdAt: Date;

  updatedAt: Date;
}
