import { Field, ObjectType } from '@nestjs/graphql';
import { InviteDto } from '@zxcdesu/data-access-invite';
import { StringifyDate } from '@zxcdesu/util-types';
import { RoleType } from '../../role/dto/role-type.enum';

@ObjectType()
export class InviteObject
  implements Omit<StringifyDate<InviteDto>, 'projectId'>
{
  @Field(() => String)
  email: string;

  @Field(() => RoleType)
  roles: RoleType[];
}
