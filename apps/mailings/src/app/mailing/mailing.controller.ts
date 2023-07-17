import { Controller } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  create() {
    return this.mailingService.create();
  }

  findOne() {
    return this.mailingService.findOne();
  }

  findAll() {
    return this.mailingService.findAll();
  }

  update() {
    return this.mailingService.update();
  }

  remove() {
    return this.mailingService.remove();
  }
}
