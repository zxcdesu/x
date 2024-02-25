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

  @Type(() => Flow)
  flow: Flow;

  createdAt: Date;

  updatedAt: Date;
}
