import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { IntegrationType } from './integration-type.enum';

@ArgsType()
export class CreateIntegrationDto {
  @Field(() => IntegrationType)
  type: IntegrationType;

  @Field(() => String)
  externalId: string;

  @Field(() => GraphQLJSON)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;
}
