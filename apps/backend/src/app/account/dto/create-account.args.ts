import { ArgsType } from '@nestjs/graphql';
import type { CreateAccountDto } from '@zxcdesu/data-access-account';

@ArgsType()
export class CreateAccountArgs implements CreateAccountDto {}
