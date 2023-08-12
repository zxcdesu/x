import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IntegrationDto {
  @Field(() => Int)
  id: number;
}
