import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@zxcdesu/prisma-platform';
import { CreateHsmDto } from './create-hsm.dto';

export class UpdateHsmDto
  extends PartialType(CreateHsmDto)
  implements Prisma.HsmUncheckedUpdateInput {}
