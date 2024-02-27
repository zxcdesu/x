import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ProjectDto } from '@zxcdesu/data-access-project';

@ObjectType()
export class ProjectObject
  implements Omit<ProjectDto, 'createdAt' | 'updatedAt'>
{
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  imageUrl: string | null;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
