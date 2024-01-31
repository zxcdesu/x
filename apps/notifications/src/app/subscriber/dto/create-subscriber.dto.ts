import { IsInt } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateSubscriberDto
  implements Prisma.SubscriberUncheckedCreateInput
{
  @IsInt()
  userId: number;

  // TODO: типы событий
}
