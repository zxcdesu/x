import { Field, ObjectType } from '@nestjs/graphql';
import { TagWithoutParentAndChildrenDto } from './tag-without-parent-and-children.dto';

@ObjectType()
export class TagDto extends TagWithoutParentAndChildrenDto {
  @Field(() => TagWithoutParentAndChildrenDto, { nullable: true })
  parent?: TagWithoutParentAndChildrenDto;

  @Field(() => [TagWithoutParentAndChildrenDto])
  children: TagWithoutParentAndChildrenDto[];
}
