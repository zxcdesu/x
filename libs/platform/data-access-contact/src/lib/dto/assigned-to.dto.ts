import { AssigneeType } from '@zxcdesu/prisma-platform';
import { IsEnum, IsInt } from 'class-validator';

export class AssignedToDto {
  @IsInt()
  id: number;

  @IsEnum(AssigneeType)
  type: AssigneeType;
}
