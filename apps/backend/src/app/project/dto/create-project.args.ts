import { ArgsType, Field } from '@nestjs/graphql';
import type { CreateProjectDto } from '@zxcdesu/data-access-project';

@ArgsType()
export class CreateProjectArgs implements CreateProjectDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;
}
