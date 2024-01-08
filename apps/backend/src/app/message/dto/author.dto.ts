import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthorType } from './author-type.enum';

@ObjectType()
export class AuthorDto {
  @Field(() => Int, { nullable: true })
  id: number | null;

  @Field(() => AuthorType)
  type: AuthorType;
}
