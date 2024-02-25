import { Controller } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { UserId } from '@zxcdesu/util-user';
import { AdminService } from './admin.service';

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
