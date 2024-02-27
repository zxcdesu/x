import { Field, ObjectType } from '@nestjs/graphql';
import type { ProjectUserDto } from '@zxcdesu/data-access-project-user';
import { Type } from 'class-transformer';
import { RoleType } from '../../role/dto/role-type.enum';
import { UserObject } from '../../user/dto/user.object';

@ObjectType()
export class ProjectUserObject implements Omit<ProjectUserDto, 'user'> {
  @Field(() => UserObject)
  @Type(() => UserObject)
  user: UserObject;

  @Field(() => [RoleType])
  roles: RoleType[];
}
