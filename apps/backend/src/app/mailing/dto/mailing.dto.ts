import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MailingDto {
  @Field(() => Int)
  id: number;
}
