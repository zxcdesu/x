import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { JwtDto } from '../jwt/dto/jwt.dto';
import { UserId } from '../user/user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindOneProjectDto } from './dto/find-one-project.dto';
import { ProjectDto } from './dto/project.dto';
import { RemoveProjectDto } from './dto/remove-project.dto';
import { SignInProjectDto } from './dto/sign-in-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @RabbitRPC({
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

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'findOneProject',
    queue: 'findOneProject',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  findOne(
    @UserId() userId: number,
    @RabbitPayload() payload: FindOneProjectDto,
  ): Promise<ProjectDto> {
    return this.projectService.findOne(userId, payload);
  }

  @RabbitRPC({
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

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'updateProject',
    queue: 'updateProject',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  update(
    @UserId() userId: number,
    @RabbitPayload() payload: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectService.update(userId, payload);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'removeProject',
    queue: 'removeProject',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  remove(
    @UserId() userId: number,
    @RabbitPayload() payload: RemoveProjectDto,
  ): Promise<ProjectDto> {
    return this.projectService.remove(userId, payload);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'signInProject',
    queue: 'signInProject',
  })
  @SerializeOptions({
    type: JwtDto,
  })
  signIn(
    @UserId() userId: number,
    @RabbitPayload() payload: SignInProjectDto,
  ): Promise<JwtDto> {
    return this.projectService.signIn(userId, payload);
  }
}
