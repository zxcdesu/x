import { Controller } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  create() {
    return this.contactService.create();
  }

  findOne() {
    return this.contactService.findOne();
  }

  findAll() {
    return this.contactService.findAll();
  }

  update() {
    return this.contactService.update();
  }

  remove() {
    return this.contactService.remove();
  }
}
