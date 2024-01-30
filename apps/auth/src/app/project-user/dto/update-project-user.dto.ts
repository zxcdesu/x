import { ArrayMinSize, IsEnum } from 'class-validator';
import { RoleType } from '../../prisma.service';

export class UpdateProjectUserDto {
  @IsEnum(RoleType, { each: true })
  @ArrayMinSize(1)
  roles: RoleType[];
}
