import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { CreateInviteDto, InviteService } from '@zxcdesu/data-access-invite';
import { ProjectId } from '@zxcdesu/data-access-project';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';

@Controller()
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'createInvite',
    queue: 'auth.createInvite',
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateInviteDto,
  ): Promise<boolean> {
    return this.inviteService.create(projectId, payload);
  }
}
