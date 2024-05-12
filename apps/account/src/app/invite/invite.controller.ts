import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import {
  CreateInviteDto,
  InviteDto,
  InviteRmq,
  InviteService,
} from '@zxcdesu/data-access-invite';
import { ProjectId } from '@zxcdesu/data-access-project';
import { ProjectUserInviteService } from '@zxcdesu/feature-project-user-invite';

@Controller()
export class InviteController {
  constructor(
    private readonly inviteService: InviteService,
    private readonly projectUserInviteService: ProjectUserInviteService,
  ) {}

  @InviteRmq.create()
  @SerializeOptions({
    type: InviteDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateInviteDto,
  ): Promise<InviteDto> {
    return this.projectUserInviteService.createInvite(projectId, payload);
  }

  @InviteRmq.findAll()
  @SerializeOptions({
    type: InviteDto,
  })
  findAll(@ProjectId() projectId: number): Promise<InviteDto[]> {
    return this.inviteService.findAll(projectId);
  }
}
