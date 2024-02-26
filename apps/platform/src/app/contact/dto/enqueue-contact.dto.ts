import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateAssignedToDto } from './create-assigned-to.dto';

export class EnqueueContactDto {
  @Type(() => CreateAssignedToDto)
  @IsOptional()
  @ValidateNested()
  assignedTo?: CreateAssignedToDto;
}
