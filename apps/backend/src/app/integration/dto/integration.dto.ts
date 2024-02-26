import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IntegrationType } from './integration-type.enum';

@ObjectType()
export class IntegrationDto {
  @Field(() => Int)
  id: number;

  @Field(() => IntegrationType)
  type: IntegrationType;

  @Field(() => String)
  externalId: string;
}
