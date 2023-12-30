import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ContactStatus } from './contact-status.enum';

@ArgsType()
export class CreateContactDto {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => Int, { nullable: true })
  priority?: number;

  @Field(() => ContactStatus)
  status: ContactStatus;

  @Field(() => String, { nullable: true })
  rejectedReason?: string;
}
