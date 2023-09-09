import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateIntegrationDto } from './create-integration.dto';

export class UpdateIntegrationDto extends IntersectionType(
  PickType(CreateIntegrationDto, ['projectId']),
  PartialType(OmitType(CreateIntegrationDto, ['projectId'])),
) {
  @IsUUID()
  id: string;
}
