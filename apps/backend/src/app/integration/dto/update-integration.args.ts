import { ArgsType, Field, PartialType } from '@nestjs/graphql';
import type { UpdateIntegrationDto } from '@zxcdesu/data-access-integration';
import { CreateIntegrationArgs } from './create-integration.args';

@ArgsType()
export class UpdateIntegrationArgs
  extends PartialType(CreateIntegrationArgs)
  implements UpdateIntegrationDto
{
  @Field(() => Number)
  id: number;
}
