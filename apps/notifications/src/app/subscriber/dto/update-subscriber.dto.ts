import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateSubscriberDto } from './create-subscriber.dto';

export class UpdateSubscriberDto extends IntersectionType(
  PickType(CreateSubscriberDto, ['userId'] as const),
  PartialType(OmitType(CreateSubscriberDto, ['userId'] as const)),
) {}
