import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateNotificationSubscriberDto {
  @Field(() => [String])
  types: string[];
}
