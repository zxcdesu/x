import { Field, ObjectType } from '@nestjs/graphql';
import { TagDto } from '../../tag/dto/tag.dto';

@ObjectType()
export class ContactTagDto {
  @Field(() => TagDto)
  tag: TagDto;
}
