import { AssigneeType } from '../../prisma.service';

export class AssignedToDto {
  id: number;

  type: AssigneeType;
}
