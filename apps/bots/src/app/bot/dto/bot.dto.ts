import { Exclude, Type } from 'class-transformer';
import { Bot } from '../../prisma.service';
import { Flow } from './compiler/flow.dto';

export class BotDto implements Bot {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  description: string;

  imageUrl: string;

  version: string;

  @Type(() => Flow)
  flow: any;

  @Exclude()
  containerId: string;

  createdAt: Date;

  updatedAt: Date;
}
