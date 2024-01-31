import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentDto {
  @Field(() => String)
  url: string;
}
