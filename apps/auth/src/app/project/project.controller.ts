import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateProjectDto,
  ProjectDto,
  ProjectService,
  UpdateProjectDto,
} from '@zxcdesu/data-access-project';
import {
  ProjectAuthService,
  SignInProjectDto,
} from '@zxcdesu/feature-project-auth';
import { RmqService } from '@zxcdesu/util-rmq';
import { UserId } from '@zxcdesu/util-user';

@Controller()
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectAuthService: ProjectAuthService,
  ) {}

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'createProject',
    queue: 'createProject',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  create(
    @UserId() userId: number,
    @RabbitPayload() payload: CreateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectService.create(userId, payload);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'findOneProject',
    queue: 'findOneProject',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  findOne(
    @UserId() userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<ProjectDto> {
    return this.projectService.findOne(userId, id);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'findAllProjects',
    queue: 'findAllProjects',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  findAll(@UserId() userId: number): Promise<ProjectDto[]> {
    return this.projectService.findAll(userId);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'updateProject',
    queue: 'updateProject',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  update(
    @UserId() userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectService.update(userId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'removeProject',
    queue: 'removeProject',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  remove(
    @UserId() userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<ProjectDto> {
    return this.projectService.remove(userId, id);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'signInProject',
    queue: 'signInProject',
  })
  signIn(
    @UserId() userId: number,
    @RabbitPayload() payload: SignInProjectDto,
  ): Promise<{
    token: string;
  }> {
    return this.projectAuthService.signIn(userId, payload);
  }
}
