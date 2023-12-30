import { Type } from 'class-transformer';
import { Flow } from '../../bot/dto/compiler/flow.dto';
import { BotTemplate, Category } from '../../prisma.service';

export class BotTemplateDto implements Omit<BotTemplate, 'flow'> {
  id: number;

  name: string;

  description: string;

  imageUrl: string;

  category: Category;

  @Type(() => Flow)
  flow: Flow;

  createdAt: Date;

  updatedAt: Date;
}
