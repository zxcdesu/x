import { Exclude } from 'class-transformer';
import { Tag } from '../../prisma.service';

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
