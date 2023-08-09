import { Type } from 'class-transformer';
import { UserDto } from '../../user/dto/user.dto';

export class ProjectUserDto {
  @Type(() => UserDto)
  user: UserDto;
}
