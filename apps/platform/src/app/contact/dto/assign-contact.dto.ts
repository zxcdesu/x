import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';
import { CreateAssignedToDto } from './create-assigned-to.dto';

export class AssignContactDto {
  @IsInt()
  projectId: number;

  @IsInt()
  id: number;

  @Type(() => CreateAssignedToDto)
  @ValidateNested()
  assignedTo: CreateAssignedToDto;
}
