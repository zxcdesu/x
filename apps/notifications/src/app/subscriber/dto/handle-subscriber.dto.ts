import { IsDefined, IsEnum } from 'class-validator';
import { SubscriberProvider } from '../../prisma.service';

export class HandleSubscriberDto<T = unknown> {
  @IsEnum(SubscriberProvider)
  provider: SubscriberProvider;

  @IsDefined()
  value: T;
}
