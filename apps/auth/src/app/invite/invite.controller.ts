import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteProjectUserService } from './invite-project-user.service';

@Controller()
export class InviteController {
  constructor(
    private readonly inviteProjectUserService: InviteProjectUserService,
  ) {}

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'inviteProjectUser',
    queue: 'inviteProjectUser',
  })
  invite(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateInviteDto,
  ): Promise<boolean> {
    return this.inviteProjectUserService.invite(projectId, payload);
  }
}
