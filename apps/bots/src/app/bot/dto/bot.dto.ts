import { Exclude, Type } from 'class-transformer';
import { Bot } from '../../prisma.service';
import { Flow } from './compiler/flow.dto';

export class BotDto implements Omit<Bot, 'flow'> {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  description: string;

  imageUrl: string | null;

  version: string;

  @Type(() => Flow)
  flow: Flow;

  @Exclude()
  containerId: string;

  createdAt: Date;

  updatedAt: Date;
}
