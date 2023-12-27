import { ArgsType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { IntegrationType } from './integration-type.enum';

@ArgsType()
export class CreateIntegrationDto {
  @Field(() => IntegrationType)
  type: IntegrationType;

  @Field(() => String)
  accountId: string;

  @Field(() => GraphQLJSON)
  token: any;
}
