import { ArgsType, PartialType } from '@nestjs/graphql';
import type { UpdateUserDto } from '@zxcdesu/data-access-user';
import { CreateUserArgs } from './create-user.args';

@ArgsType()
export class UpdateUserArgs
  extends PartialType(CreateUserArgs)
  implements UpdateUserDto {}
