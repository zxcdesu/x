import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateHsmDto {
  @Field(() => String)
  name: string;
}
