import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { UserId } from '../user/user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindOneProjectDto } from './dto/find-one-project.dto';
import { ProjectDto } from './dto/project.dto';
import { RemoveProjectDto } from './dto/remove-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @RabbitRPC({
    routingKey: 'createProject',
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
    routingKey: 'findOneProject',
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
    routingKey: 'findAllProjects',
  })
  @SerializeOptions({
    type: ProjectDto,
  })
  findAll(@UserId() userId: number): Promise<ProjectDto[]> {
    return this.projectService.findAll(userId);
  }

  @RabbitRPC({
    routingKey: 'updateProject',
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
    routingKey: 'removeProject',
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
}
