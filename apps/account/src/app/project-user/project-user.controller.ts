import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/data-access-project';
import {
  ProjectUserDto,
  ProjectUserRmq,
  ProjectUserService,
  UpdateProjectUserDto,
} from '@zxcdesu/data-access-project-user';
import { UserId } from '@zxcdesu/data-access-user';

@Controller()
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService) {}

  @ProjectUserRmq.findOne()
  @SerializeOptions({
    type: ProjectUserDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @UserId() userId: number,
  ): Promise<ProjectUserDto> {
    return this.projectUserService.findOne(projectId, userId);
  }

  @ProjectUserRmq.findAll()
  @SerializeOptions({
    type: ProjectUserDto,
  })
  findAll(@ProjectId() projectId: number): Promise<ProjectUserDto[]> {
    return this.projectUserService.findAll(projectId);
  }

  @ProjectUserRmq.update()
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

  @ProjectUserRmq.remove()
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
