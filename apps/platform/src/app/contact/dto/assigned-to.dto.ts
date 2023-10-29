import { Exclude } from 'class-transformer';
import { CreateAssignedToDto } from './create-assigned-to.dto';

export class AssignedToDto extends CreateAssignedToDto {
  @Exclude()
  contactId: number;
}
