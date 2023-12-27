import { BotTemplate, Category } from '../../prisma.service';

export class BotTemplateDto implements BotTemplate {
  id: number;

  name: string;

  description: string;

  imageUrl: string;

  category: Category;

  flow: any;

  createdAt: Date;

  updatedAt: Date;
}
