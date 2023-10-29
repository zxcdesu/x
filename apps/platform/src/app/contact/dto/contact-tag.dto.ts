import { Type } from 'class-transformer';
import { TagWithoutParentAndChildrenDto } from '../../tag/dto/tag-without-parent-and-children.dto';

export class ContactTagDto {
  @Type(() => TagWithoutParentAndChildrenDto)
  tag: TagWithoutParentAndChildrenDto;
}
