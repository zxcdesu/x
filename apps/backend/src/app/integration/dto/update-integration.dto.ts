import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateIntegrationDto } from './create-integration.dto';

@ArgsType()
export class UpdateIntegrationDto extends PartialType(CreateIntegrationDto) {
  @Field(() => Int)
  id: number;
}
