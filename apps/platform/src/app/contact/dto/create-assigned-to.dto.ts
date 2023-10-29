import { IsEnum, IsInt } from 'class-validator';
import { AssigneeType } from '../../prisma.service';

export class CreateAssignedToDto {
  @IsInt()
  id: number;

  @IsEnum(AssigneeType)
  type: AssigneeType;
}
