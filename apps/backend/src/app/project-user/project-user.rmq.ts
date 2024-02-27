import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { ProjectUserObject } from './dto/project-user.object';
import { UpdateProjectUserArgs } from './dto/update-project-user.args';

@Injectable()
export class ProjectUserRmq extends RmqService {
  findOne(projectId: number, userId: number) {
    return this.request<ProjectUserObject>({
      exchange: 'auth',
      routingKey: 'findOneProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }

  findAll(projectId: number) {
    return this.request<ProjectUserObject[]>({
      exchange: 'auth',
      routingKey: 'findAllProjectUsers',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateProjectUserArgs) {
    return this.request<ProjectUserObject>({
      exchange: 'auth',
      routingKey: 'updateProjectUser',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, userId: number) {
    return this.request<ProjectUserObject>({
      exchange: 'auth',
      routingKey: 'removeProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }
}
