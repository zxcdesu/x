import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateTagDto {
  @Field(() => String)
  name: string;
}
