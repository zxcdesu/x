import { ArgsType, PartialType } from '@nestjs/graphql';
import type { UpdateAccountDto } from '@zxcdesu/data-access-account';
import { CreateAccountArgs } from './create-account.args';

@ArgsType()
export class UpdateAccountArgs
  extends PartialType(CreateAccountArgs)
  implements UpdateAccountDto {}
