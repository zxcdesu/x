import { Type } from 'class-transformer';
import { RoleType } from '../../prisma.service';
import { UserDto } from '../../user/dto/user.dto';

export class ProjectUserDto {
  @Type(() => UserDto)
  user: UserDto;

  roles: RoleType[];
}
