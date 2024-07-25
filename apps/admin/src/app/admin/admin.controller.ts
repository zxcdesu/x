import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { AdminRmq, AdminService } from '@zxcdesu/data-access-admin';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @AdminRmq.validate()
  validate(
    @RabbitPayload('userId', ParseUUIDPipe) userId: number,
  ): Promise<boolean> {
    return this.adminService.validate(userId);
  }
}
