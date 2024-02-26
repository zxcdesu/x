import { ArgsType, Field, PartialType } from '@nestjs/graphql';
import { CreateIntegrationDto } from './create-integration.dto';

@ArgsType()
export class UpdateIntegrationDto extends PartialType(CreateIntegrationDto) {
  @Field(() => Number)
  id: number;
}
