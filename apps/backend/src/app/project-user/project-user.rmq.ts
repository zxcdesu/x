import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/nestjs-rabbitmq';
import { ProjectUserDto } from './dto/project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';

@Injectable()
export class ProjectUserRmq extends RmqService {
  findOne(projectId: number, userId: number) {
    return this.request<ProjectUserDto>({
      exchange: 'auth',
      routingKey: 'findOneProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }

  findAll(projectId: number) {
    return this.request<ProjectUserDto[]>({
      exchange: 'auth',
      routingKey: 'findAllProjectUsers',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateProjectUserDto) {
    return this.request<ProjectUserDto>({
      exchange: 'auth',
      routingKey: 'updateProjectUser',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, userId: number) {
    return this.request<ProjectUserDto>({
      exchange: 'auth',
      routingKey: 'removeProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }
}
