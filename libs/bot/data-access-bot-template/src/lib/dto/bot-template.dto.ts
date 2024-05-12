import { FlowDto } from '@zxcdesu/data-access-bot';
import { BotTemplate, Category } from '@zxcdesu/prisma-bot';
import { Type } from 'class-transformer';

export class BotTemplateDto implements Omit<BotTemplate, 'flow'> {
  id: number;

  name: string;

  description: string;

  imageUrl: string;

  category: Category;

  @Type(() => FlowDto)
  flow: FlowDto;

  createdAt: Date;

  updatedAt: Date;
}
