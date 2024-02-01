import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';
import { AssignedToDto } from './assigned-to.dto';

export class FindAllContactsDto {
  @IsInt()
  projectId: number;

  @Type(() => AssignedToDto)
  @ValidateNested()
  assignedTo: AssignedToDto;
}
