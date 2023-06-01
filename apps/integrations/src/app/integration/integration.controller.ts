import { Controller } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Controller()
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  create() {
    return this.integrationService.create();
  }

  findOne() {
    return this.integrationService.create();
  }

  findAll() {
    return this.integrationService.create();
  }

  update() {
    return this.integrationService.create();
  }

  remove() {
    return this.integrationService.create();
  }
}
