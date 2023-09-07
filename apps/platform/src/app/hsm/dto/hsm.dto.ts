import { Exclude } from 'class-transformer';
import { Hsm } from '../../prisma.service';

export class HsmDto implements Hsm {
  id: number;

  @Exclude()
  projectId: number;

  code: string;

  text: string;

  attachments: any[];

  buttons: any[];

  createdAt: Date;

  updatedAt: Date;
}
