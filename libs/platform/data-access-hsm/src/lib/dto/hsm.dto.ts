import type { Hsm } from '@zxcdesu/prisma-platform';
import { Exclude } from 'class-transformer';

export class HsmDto implements Hsm {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  text: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttons: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media: any;

  createdAt: Date;

  updatedAt: Date;
}
