import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateBotTemplateDto {
  @Field(() => String)
  name: string;
}
