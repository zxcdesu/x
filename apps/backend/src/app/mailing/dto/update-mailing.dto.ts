import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateMailingDto } from './create-mailing.dto';

@ArgsType()
export class UpdateMailingDto extends PartialType(CreateMailingDto) {
  @Field(() => Int)
  id: number;
}
