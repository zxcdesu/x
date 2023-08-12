import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateHsmDto } from './create-hsm.dto';

@ArgsType()
export class UpdateHsmDto extends PartialType(CreateHsmDto) {
  @Field(() => Int)
  id: number;
}
