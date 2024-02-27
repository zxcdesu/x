import { ArgsType, Field } from '@nestjs/graphql';
import { CreateInviteDto } from '@zxcdesu/data-access-invite';
import { RoleType } from '../../role/dto/role-type.enum';

@ArgsType()
export class CreateInviteArgs implements CreateInviteDto {
  @Field(() => String)
  email: string;

  @Field(() => RoleType)
  roles: RoleType[];
}
