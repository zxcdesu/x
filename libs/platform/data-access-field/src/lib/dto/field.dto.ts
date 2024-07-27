import type { Field } from '@zxcdesu/prisma-platform';
import { Exclude } from 'class-transformer';

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
