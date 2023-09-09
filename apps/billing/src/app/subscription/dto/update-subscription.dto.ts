import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateSubscriptionDto } from './create-subscription.dto';

export class UpdateSubscriptionDto extends IntersectionType(
  PickType(CreateSubscriptionDto, ['projectId']),
  PartialType(OmitType(CreateSubscriptionDto, ['projectId'])),
) {}
