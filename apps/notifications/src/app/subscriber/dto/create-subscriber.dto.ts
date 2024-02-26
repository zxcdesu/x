import { IsEnum } from 'class-validator';
import { Prisma, SubscriberProvider } from '../../prisma.service';

export class CreateSubscriberDto
  implements Omit<Prisma.SubscriberUncheckedCreateInput, 'userId'>
{
  @IsEnum(SubscriberProvider)
  provider: SubscriberProvider;
}
