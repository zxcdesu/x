import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthorType } from './author-type.enum';

@ObjectType()
export class AuthorDto {
  @Field(() => Int)
  id: number;

  @Field(() => AuthorType)
  type: AuthorType;
}
