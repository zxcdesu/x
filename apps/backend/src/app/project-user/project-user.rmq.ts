import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { ProjectUserDto } from './dto/project-user.dto';

@Injectable()
export class ProjectUserRmq extends RmqService {
  private readonly exchange = 'auth';

  findOne(projectId: number, userId: number) {
    return this.request<ProjectUserDto>({
      exchange: this.exchange,
      routingKey: 'findOneProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }

  findAll(projectId: number) {
    return this.request<ProjectUserDto[]>({
      exchange: this.exchange,
      routingKey: 'findAllProjectUsers',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateProjectUserDto) {
    return this.request<ProjectUserDto>({
      exchange: this.exchange,
      routingKey: 'updateProjectUser',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, userId: number) {
    return this.request<ProjectUserDto>({
      exchange: this.exchange,
      routingKey: 'removeProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }
}
