import { ArgsType, Field } from '@nestjs/graphql';
import { RoleType } from '../../role/dto/role-type.enum';

@ArgsType()
export class CreateInviteDto {
  @Field(() => String)
  email: string;

  @Field(() => RoleType)
  roles: RoleType[];
}
