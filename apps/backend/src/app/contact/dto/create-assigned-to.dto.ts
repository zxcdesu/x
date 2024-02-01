import { Field, InputType, Int } from '@nestjs/graphql';
import { AssigneeType } from './assignee-type.enum';

@InputType()
export class CreateAssignedToDto {
  @Field(() => Int)
  id: number;

  @Field(() => AssigneeType)
  type: AssigneeType;
}
