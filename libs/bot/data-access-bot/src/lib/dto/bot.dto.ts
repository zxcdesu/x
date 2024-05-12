import { Bot } from '@zxcdesu/prisma-bot';
import { Exclude, Type } from 'class-transformer';
import { FlowDto } from './schema';

export class BotDto implements Omit<Bot, 'flow'> {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  description: string;

  imageUrl: string | null;

  @Type(() => FlowDto)
  flow: FlowDto;

  createdAt: Date;

  updatedAt: Date;
}
