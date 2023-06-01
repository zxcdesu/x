import { Controller } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller()
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  create() {
    return this.webhookService.create();
  }

  findOne() {
    return this.webhookService.findOne();
  }

  findAll() {
    return this.webhookService.findAll();
  }

  update() {
    return this.webhookService.update();
  }

  remove() {
    return this.webhookService.remove();
  }
}
