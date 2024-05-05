import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import {
  CreateInviteDto,
  InviteDto,
  InviteRmq,
} from '@zxcdesu/data-access-invite';
import { ProjectId } from '@zxcdesu/data-access-project';
import { ProjectUserInviteService } from '@zxcdesu/feature-project-user-invite';

@Controller()
export class InviteController {
  constructor(
    private readonly projectUserInviteService: ProjectUserInviteService,
  ) {}

  @InviteRmq.create()
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateInviteDto,
  ): Promise<InviteDto> {
    return this.projectUserInviteService.createInvite(projectId, payload);
  }
}
