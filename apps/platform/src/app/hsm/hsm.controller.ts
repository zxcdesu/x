import { Controller } from '@nestjs/common';
import { HsmService } from './hsm.service';

@Controller()
export class HsmController {
  constructor(private readonly hsmService: HsmService) {}

  create() {
    return this.hsmService.create();
  }

  findOne() {
    return this.hsmService.findOne();
  }

  findAll() {
    return this.hsmService.findAll();
  }

  update() {
    return this.hsmService.update();
  }

  remove() {
    return this.hsmService.remove();
  }
}
