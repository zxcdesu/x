import { Controller } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { UserId } from '@zxcdesu/util-user';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @RabbitRPC({
    exchange: 'admin',
    routingKey: 'checkAdmin',
    queue: 'checkAdmin',
  })
  check(@UserId userId: number) {
    return this.adminService.check(userId);
  }
}
