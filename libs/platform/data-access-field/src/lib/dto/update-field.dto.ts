import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@zxcdesu/prisma-platform';
import { CreateFieldDto } from './create-field.dto';

export class UpdateFieldDto
  extends PartialType(CreateFieldDto)
  implements Prisma.FieldUncheckedUpdateInput {}
