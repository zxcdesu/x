import { Controller } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  create() {
    return this.subscriptionService.create();
  }

  findOne() {
    return this.subscriptionService.findOne();
  }

  findAll() {
    return this.subscriptionService.findAll();
  }

  update() {
    return this.subscriptionService.update();
  }

  remove() {
    return this.subscriptionService.remove();
  }
}
