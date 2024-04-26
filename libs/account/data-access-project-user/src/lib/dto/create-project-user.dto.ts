import { RoleType } from '@zxcdesu/prisma-account';
import { Transform } from 'class-transformer';
import { ArrayMinSize, IsEnum } from 'class-validator';

export class CreateProjectUserDto {
  @Transform(({ value }) => value && Array.from(new Set(value).values()))
  @IsEnum(RoleType, { each: true })
  @ArrayMinSize(1)
  roles: RoleType[];
}
