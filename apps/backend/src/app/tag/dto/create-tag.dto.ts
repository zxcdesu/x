import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateTagDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  color: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;
}
