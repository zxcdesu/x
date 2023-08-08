import { Type } from 'class-transformer';
import { UserDto } from '../user/user.dto';

export class UpdateProjectUserDto {
  // access
}

export class ProjectUserDto {
  @Type(() => UserDto)
  user: UserDto;
}
