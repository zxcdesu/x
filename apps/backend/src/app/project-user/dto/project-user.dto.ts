import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { RoleType } from '../../role/dto/role-type.enum';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class ProjectUserDto {
  @Field(() => UserDto)
  @Type(() => UserDto)
  user: UserDto;

  @Field(() => [RoleType])
  roles: RoleType[];
}
