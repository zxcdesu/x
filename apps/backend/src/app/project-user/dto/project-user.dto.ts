import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class ProjectUserDto {
  @Field(() => UserDto)
  @Type(() => UserDto)
  user: UserDto;
}
