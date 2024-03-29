import { TagWithoutParentAndChildrenDto } from '@zxcdesu/data-access-tag';
import { ContactTag } from '@zxcdesu/prisma-platform';
import { Exclude, Type } from 'class-transformer';

export class ContactTagDto implements ContactTag {
  @Exclude()
  contactId: number;

  @Exclude()
  tagId: number;

  @Type(() => TagWithoutParentAndChildrenDto)
  tag: TagWithoutParentAndChildrenDto;
}
