import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends IntersectionType(
  PickType(CreateWalletDto, ['projectId']),
  PartialType(OmitType(CreateWalletDto, ['projectId'])),
) {}
