import { ArgsType, Field, Int } from '@nestjs/graphql';
import { CreateAssignedToDto } from './create-assigned-to.dto';

@ArgsType()
export class EnqueueContactDto {
  @Field(() => Int)
  id: number;

  @Field(() => CreateAssignedToDto, { nullable: true })
  assignedTo?: CreateAssignedToDto;
}
