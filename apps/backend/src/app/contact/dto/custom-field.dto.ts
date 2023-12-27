import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomFieldDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  value: string;
}
