import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { FindOneUserDto } from './find-one-user.dto';
export class UpdateUserDto extends IntersectionType(
  FindOneUserDto,
  PartialType(CreateUserDto),
) {}
