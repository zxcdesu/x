import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateWebhookDto } from './create-webhook.dto';

export class UpdateWebhookDto extends IntersectionType(
  PickType(CreateWebhookDto, ['projectId']),
  PartialType(OmitType(CreateWebhookDto, ['projectId'])),
) {
  @IsInt()
  id: number;
}
