import { Type } from 'class-transformer';
import { PaymentUrlDto } from './payment-url.dto';
import { PaymentDto } from './payment.dto';

export class PaymentInPendingDto extends PaymentDto {
  @Type(() => PaymentUrlDto)
  url: PaymentUrlDto;
}
