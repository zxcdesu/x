import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import {
  ProjectUserDto,
  ProjectUserService,
  UpdateProjectUserDto,
} from '@zxcdesu/data-access-project-user';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { UserId } from '@zxcdesu/util-user';

@Controller()
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService) {}

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'findOneProjectUser',
    queue: 'findOneProjectUser',
  })
  @SerializeOptions({
    type: ProjectUserDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @UserId() userId: number,
  ): Promise<ProjectUserDto> {
    return this.projectUserService.findOne(projectId, userId);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'findAllProjectUsers',
    queue: 'findAllProjectUsers',
  })
  @SerializeOptions({
    type: ProjectUserDto,
  })
  findAll(@ProjectId() projectId: number): Promise<ProjectUserDto[]> {
    return this.projectUserService.findAll(projectId);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'updateProjectUser',
    queue: 'updateProjectUser',
  })
  @SerializeOptions({
    type: ProjectUserDto,
  })
  update(
    @ProjectId() projectId: number,
    @UserId() userId: number,
    @RabbitPayload() payload: UpdateProjectUserDto,
  ): Promise<ProjectUserDto> {
    return this.projectUserService.update(projectId, userId, payload);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'removeProjectUser',
    queue: 'removeProjectUser',
  })
  @SerializeOptions({
    type: ProjectUserDto,
  })
  remove(
    @ProjectId() projectId: number,
    @UserId() userId: number,
  ): Promise<ProjectUserDto> {
    return this.projectUserService.remove(projectId, userId);
  }
}
