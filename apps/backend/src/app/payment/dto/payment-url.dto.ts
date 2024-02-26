import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentUrlDto {
  @Field(() => String)
  url: string;
}
