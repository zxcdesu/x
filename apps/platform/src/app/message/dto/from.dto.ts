import { Exclude } from 'class-transformer';
import { From, FromType } from '../../prisma.service';

export class FromDto implements From {
  @Exclude()
  messageId: number;

  id: number;

  type: FromType;
}
