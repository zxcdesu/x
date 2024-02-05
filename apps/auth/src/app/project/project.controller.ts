import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateProjectDto,
  ProjectDto,
  ProjectService,
  SignInProjectDto,
  UpdateProjectDto,
} from '@zxcdesu/data-access-project';
import { UserId } from '@zxcdesu/data-access-user';
import { JwtDto } from '@zxcdesu/infrastructure';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { ProjectAuthService } from './project-auth.service';

@Controller()
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectAuthService: ProjectAuthService,
  ) {}

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'createProject',
    queue: 'auth.createProject',
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

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'findOneProject',
    queue: 'auth.findOneProject',
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

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'findAllProjects',
    queue: 'auth.findAllProjects',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  findAll(@UserId() userId: number): Promise<ProjectDto[]> {
    return this.projectService.findAll(userId);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'updateProject',
    queue: 'auth.updateProject',
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

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'removeProject',
    queue: 'auth.removeProject',
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

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'signInProject',
    queue: 'auth.signInProject',
  })
  @SerializeOptions({
    type: JwtDto,
  })
  signIn(
    @UserId() userId: number,
    @RabbitPayload() payload: SignInProjectDto,
  ): Promise<JwtDto> {
    return this.projectAuthService.signIn(userId, payload);
  }
}
