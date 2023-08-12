import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectDto {
  @Field(() => Int)
  id: number;
}
