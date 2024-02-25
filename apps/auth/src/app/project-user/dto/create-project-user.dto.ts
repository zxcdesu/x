import { Transform } from 'class-transformer';
import { ArrayMinSize, IsEnum } from 'class-validator';
import { RoleType } from '../../prisma.service';

export class CreateProjectUserDto {
  @Transform(({ value }) => value && Array.from(new Set(value).values()))
  @IsEnum(RoleType, { each: true })
  @ArrayMinSize(1)
  roles: RoleType[];
}
