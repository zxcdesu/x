import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenDto {
  @Field(() => String)
  token: string;
}
