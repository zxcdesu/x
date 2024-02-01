import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateSubscriberDto {
  @Field(() => [String])
  types: string[];
}
