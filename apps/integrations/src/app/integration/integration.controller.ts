import { Controller } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Controller()
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  create() {
    return this.integrationService.create();
  }

  findOne() {
    return this.integrationService.findOne();
  }

  findAll() {
    return this.integrationService.findAll();
  }

  update() {
    return this.integrationService.update();
  }

  remove() {
    return this.integrationService.remove();
  }
}
