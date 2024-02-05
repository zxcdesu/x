import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { AdminService, CheckAdminDto } from '@zxcdesu/data-access-admin';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @RabbitRPC({
    exchange: 'admin',
    routingKey: 'checkAdmin',
    queue: 'admin.checkAdmin',
  })
  check(@RabbitPayload() payload: CheckAdminDto) {
    return this.adminService.check(payload);
  }
}
