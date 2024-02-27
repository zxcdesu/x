import { Field, ObjectType } from '@nestjs/graphql';
import type { ProjectUserDto } from '@zxcdesu/data-access-project-user';
import { Type } from 'class-transformer';
import { RoleType } from '../../role/dto/role-type.enum';
import { User } from '../../user/dto/user.entity';

@ObjectType()
export class ProjectUser implements Omit<ProjectUserDto, 'user'> {
  @Field(() => User)
  @Type(() => User)
  user: User;

  @Field(() => [RoleType])
  roles: RoleType[];
}
