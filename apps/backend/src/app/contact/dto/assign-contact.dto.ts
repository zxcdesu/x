import { ArgsType, Field, Int } from '@nestjs/graphql';
import { CreateAssignedToDto } from './create-assigned-to.dto';

@ArgsType()
export class AssignContactDto {
  @Field(() => Int)
  id: number;

  @Field(() => CreateAssignedToDto)
  assignedTo: CreateAssignedToDto;
}
