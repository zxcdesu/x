import { Controller } from '@nestjs/common';
import { AdminService } from '@zxcdesu/data-access-admin';
import { RmqService } from '@zxcdesu/util-rmq';
import { UserId } from '@zxcdesu/util-user';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @RmqService.rpc({
    exchange: 'admin',
    routingKey: 'checkAdmin',
    queue: 'checkAdmin',
  })
  check(@UserId() userId: number) {
    return this.adminService.check(userId);
  }
}
