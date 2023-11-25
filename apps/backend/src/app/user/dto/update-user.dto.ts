import { ArgsType, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.dto';

@ArgsType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}
