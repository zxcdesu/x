import { Field, ObjectType } from '@nestjs/graphql';
import { IntegrationType } from './integration-type.enum';

@ObjectType()
export class IntegrationDto {
  @Field(() => String)
  id: string;

  @Field(() => IntegrationType)
  type: IntegrationType;

  @Field(() => String)
  accountId: string;
}
