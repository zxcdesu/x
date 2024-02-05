import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/data-access-project';
import {
  CreateProjectUserDto,
  ProjectUserDto,
  ProjectUserService,
  UpdateProjectUserDto,
} from '@zxcdesu/data-access-project-user';
import { UserId } from '@zxcdesu/data-access-user';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';

@Controller()
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService) {}

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'createProjectUser',
    queue: 'auth.createProjectUser',
  })
  @SerializeOptions({
    type: ProjectUserDto,
  })
  create(
    @ProjectId() projectId: number,
    @UserId() userId: number,
    @RabbitPayload() payload: CreateProjectUserDto,
  ): Promise<ProjectUserDto> {
    return this.projectUserService.create(projectId, userId, payload);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'findOneProjectUser',
    queue: 'auth.findOneProjectUser',
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

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'findAllProjectUsers',
    queue: 'auth.findAllProjectUsers',
  })
  @SerializeOptions({
    type: ProjectUserDto,
  })
  findAll(@ProjectId() projectId: number): Promise<ProjectUserDto[]> {
    return this.projectUserService.findAll(projectId);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'updateProjectUser',
    queue: 'auth.updateProjectUser',
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

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'removeProjectUser',
    queue: 'auth.removeProjectUser',
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
