import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AssigneeType } from './assignee-type.enum';

@ObjectType()
export class AssignedToDto {
  @Field(() => Int)
  id: number;

  @Field(() => AssigneeType)
  type: AssigneeType;
}
