import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateProjectDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;
}
