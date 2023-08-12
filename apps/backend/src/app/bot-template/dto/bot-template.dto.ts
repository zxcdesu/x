import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BotTemplateDto {
  @Field(() => Int)
  id: number;
}
