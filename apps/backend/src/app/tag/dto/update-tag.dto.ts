import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateTagDto } from './create-tag.dto';

@ArgsType()
export class UpdateTagDto extends PartialType(CreateTagDto) {
  @Field(() => Int)
  id: number;
}
