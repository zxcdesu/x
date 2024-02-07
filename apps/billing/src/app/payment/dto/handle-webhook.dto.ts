import { IsDefined, IsEnum } from 'class-validator';
import { PaymentProvider } from '../../prisma.service';

export class HandleWebhookDto<T = unknown> {
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsDefined()
  value: T;
}
