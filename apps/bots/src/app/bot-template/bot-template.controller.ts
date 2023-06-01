import { Controller } from '@nestjs/common';
import { BotTemplateService } from './bot-template.service';

@Controller()
export class BotTemplateController {
  constructor(private readonly botTemplateService: BotTemplateService) {}

  create() {
    return this.botTemplateService.create();
  }

  findOne() {
    return this.botTemplateService.findOne();
  }

  findAll() {
    return this.botTemplateService.findAll();
  }

  update() {
    return this.botTemplateService.update();
  }

  remove() {
    return this.botTemplateService.remove();
  }
}
