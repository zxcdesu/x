import { ArgsType, Field, Int, ObjectType, PartialType } from '@nestjs/graphql';

@ArgsType()
export class CreateUserDto {
  @Field(() => String)
  email: string;
}

@ArgsType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
}
