import { ArgsType, Field, Int } from '@nestjs/graphql';
import { RoleType } from '../../role/dto/role-type.enum';

@ArgsType()
export class UpdateProjectUserDto {
  @Field(() => Int)
  userId: number;

  @Field(() => [RoleType])
  roles: RoleType[];
}
