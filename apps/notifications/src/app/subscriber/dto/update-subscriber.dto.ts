import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateSubscriberDto } from './create-subscriber.dto';

export class UpdateSubscriberDto extends PartialType(
  OmitType(CreateSubscriberDto, ['provider'] as const),
) {}
