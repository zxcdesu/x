import { Exclude } from 'class-transformer';
import { Field } from '../../prisma.service';

export class FieldDto implements Field {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  description: string;

  value: string | null;

  createdAt: Date;

  updatedAt: Date;
}
