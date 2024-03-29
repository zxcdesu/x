import { Type } from 'class-transformer';
import { TagWithoutParentAndChildrenDto } from './tag-without-parent-and-children.dto';

export class TagDto extends TagWithoutParentAndChildrenDto {
  @Type(() => TagWithoutParentAndChildrenDto)
  parent?: TagWithoutParentAndChildrenDto;

  @Type(() => TagWithoutParentAndChildrenDto)
  children: TagWithoutParentAndChildrenDto[];
}
