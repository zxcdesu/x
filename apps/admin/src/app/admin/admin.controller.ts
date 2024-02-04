import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @RabbitRPC({
    exchange: 'admin',
    routingKey: 'checkAdmin',
    queue: 'admin.checkAdmin',
  })
  check(@RabbitPayload('userId', ParseIntPipe) userId: number) {
    return this.adminService.check(userId);
  }
}
