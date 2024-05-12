import { Controller } from '@nestjs/common';
import { AdminRmq, AdminService } from '@zxcdesu/data-access-admin';
import { UserId } from '@zxcdesu/data-access-user';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @AdminRmq.check()
  check(@UserId() userId: number): Promise<boolean> {
    return this.adminService.check(userId);
  }
}
