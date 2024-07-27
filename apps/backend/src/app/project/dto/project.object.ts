import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ProjectDto } from '@zxcdesu/data-access-project';
import { Type } from 'class-transformer';

@ObjectType()
export class ProjectObject implements ProjectDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  imageUrl: string | null;

  @Type(() => Date)
  @Field(() => String)
  createdAt: Date;

  @Type(() => Date)
  @Field(() => String)
  updatedAt: Date;
}
