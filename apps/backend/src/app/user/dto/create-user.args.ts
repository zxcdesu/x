import { ArgsType } from '@nestjs/graphql';
import type { CreateUserDto } from '@zxcdesu/data-access-user';

@ArgsType()
export class CreateUserArgs implements CreateUserDto {}
