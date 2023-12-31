import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { ProjectId } from '../project/project.decorator';
import { UserId } from '../user/user.decorator';
import { ProjectUserDto } from './dto/project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { ProjectUserService } from './project-user.service';

@Controller()
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService) {}

  @RabbitRPC({
    routingKey: 'findOneProjectUser',
    exchange: 'auth',
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
    routingKey: 'findAllProjectUsers',
    exchange: 'auth',
  })
  @SerializeOptions({
    type: ProjectUserDto,
  })
  findAll(@ProjectId() projectId: number): Promise<ProjectUserDto[]> {
    return this.projectUserService.findAll(projectId);
  }

  @RabbitRPC({
    routingKey: 'updateProjectUser',
    exchange: 'auth',
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
    routingKey: 'removeProjectUser',
    exchange: 'auth',
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
