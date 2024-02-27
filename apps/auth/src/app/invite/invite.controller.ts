import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { CreateInviteDto } from '@zxcdesu/data-access-invite';
import { InviteUserToProjectService } from '@zxcdesu/feature-invite-user-to-project';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class InviteController {
  constructor(
    private readonly inviteUserToProjectService: InviteUserToProjectService,
  ) {}

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'inviteUserToProject',
    queue: 'inviteUserToProject',
  })
  invite(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateInviteDto,
  ): Promise<boolean> {
    return this.inviteUserToProjectService.invite(projectId, payload);
  }
}
