import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateIntegrationDto {
  @Field(() => String)
  name: string;
}
