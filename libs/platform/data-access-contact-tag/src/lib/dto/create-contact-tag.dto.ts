import { Prisma } from '@zxcdesu/prisma-platform';
import { IsInt } from 'class-validator';

export class CreateContactTagDto
  implements Prisma.ContactTagUncheckedCreateInput
{
  @IsInt()
  tagId: number;

  @IsInt()
  contactId: number;
}
