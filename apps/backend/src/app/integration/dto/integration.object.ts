import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { IntegrationDto } from '@zxcdesu/data-access-integration';
import { IntegrationType } from './integration-type.enum';

@ObjectType()
export class IntegrationObject
  implements Omit<IntegrationDto, 'projectId' | 'token'>
{
  @Field(() => Int)
  id: number;

  @Field(() => IntegrationType)
  type: IntegrationType;

  @Field(() => String)
  externalId: string;
}
