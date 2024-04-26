import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateProjectDto,
  ProjectDto,
  ProjectRmq,
  ProjectService,
  UpdateProjectDto,
} from '@zxcdesu/data-access-project';
import { UserId } from '@zxcdesu/data-access-user';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ProjectRmq.create()
  @SerializeOptions({
    type: ProjectDto,
  })
  create(
    @UserId() userId: number,
    @RabbitPayload() payload: CreateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectService.create(userId, payload);
  }

  @ProjectRmq.findOne()
  @SerializeOptions({
    type: ProjectDto,
  })
  findOne(
    @UserId() userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<ProjectDto> {
    return this.projectService.findOne(userId, id);
  }

  @ProjectRmq.findAll()
  @SerializeOptions({
    type: ProjectDto,
  })
  findAll(@UserId() userId: number): Promise<ProjectDto[]> {
    return this.projectService.findAll(userId);
  }

  @ProjectRmq.update()
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

  @ProjectRmq.remove()
  @SerializeOptions({
    type: ProjectDto,
  })
  remove(
    @UserId() userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<ProjectDto> {
    return this.projectService.remove(userId, id);
  }
}
