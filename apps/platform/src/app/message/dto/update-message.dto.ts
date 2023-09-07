import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends IntersectionType(
  PickType(CreateMessageDto, ['externalId']),
  PartialType(OmitType(CreateMessageDto, ['externalId'])),
) {}
