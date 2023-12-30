import { Field, ObjectType } from '@nestjs/graphql';
import { TagWithoutParentAndChildrenDto } from '../../tag/dto/tag-without-parent-and-children.dto';

@ObjectType()
export class ContactTagDto {
  @Field(() => TagWithoutParentAndChildrenDto)
  tag: TagWithoutParentAndChildrenDto;
}
