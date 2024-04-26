import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ProjectDto } from '@zxcdesu/data-access-project';
import { StringifyDate } from '@zxcdesu/util-types';

@ObjectType()
export class ProjectObject implements StringifyDate<ProjectDto> {
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
