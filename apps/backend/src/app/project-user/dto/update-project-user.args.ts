import { ArgsType, Field, Int } from '@nestjs/graphql';
import type { UpdateProjectUserDto } from '@zxcdesu/data-access-project-user';
import { RoleType } from '../../role/dto/role-type.enum';

@ArgsType()
export class UpdateProjectUserArgs implements UpdateProjectUserDto {
  @Field(() => Int)
  userId: number;

  @Field(() => [RoleType])
  roles: RoleType[];
}
