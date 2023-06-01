import { Controller } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  create() {
    return this.mailingService.create();
  }

  findOne() {
    return this.mailingService.create();
  }

  findAll() {
    return this.mailingService.create();
  }

  update() {
    return this.mailingService.create();
  }

  remove() {
    return this.mailingService.create();
  }
}
