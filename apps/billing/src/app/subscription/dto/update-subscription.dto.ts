import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateSubscriptionDto } from './create-subscription.dto';

export class UpdateSubscriptionDto extends IntersectionType(
  PickType(CreateSubscriptionDto, ['projectId'] as const),
  PartialType(OmitType(CreateSubscriptionDto, ['projectId'] as const)),
) {}
