import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateWebhookDto } from './create-webhook.dto';

export class UpdateWebhookDto extends IntersectionType(
  PickType(CreateWebhookDto, ['projectId'] as const),
  PartialType(OmitType(CreateWebhookDto, ['projectId'] as const)),
) {
  @IsInt()
  id: number;
}
