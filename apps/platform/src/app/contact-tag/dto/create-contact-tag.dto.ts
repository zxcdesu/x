import { IsInt } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateContactTagDto
  implements Prisma.ContactTagUncheckedCreateInput
{
  @IsInt()
  tagId: number;

  @IsInt()
  contactId: number;
}
