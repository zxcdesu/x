import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateContactDto } from './create-contact.dto';

@ArgsType()
export class UpdateContactDto extends PartialType(CreateContactDto) {
  @Field(() => Int)
  id: number;
}
