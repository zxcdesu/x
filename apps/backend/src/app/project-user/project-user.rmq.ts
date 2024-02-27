import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { ProjectUser } from './dto/project-user.entity';
import { UpdateProjectUserArgs } from './dto/update-project-user.args';

@Injectable()
export class ProjectUserRmq extends RmqService {
  findOne(projectId: number, userId: number) {
    return this.request<ProjectUser>({
      exchange: 'auth',
      routingKey: 'findOneProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }

  findAll(projectId: number) {
    return this.request<ProjectUser[]>({
      exchange: 'auth',
      routingKey: 'findAllProjectUsers',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateProjectUserArgs) {
    return this.request<ProjectUser>({
      exchange: 'auth',
      routingKey: 'updateProjectUser',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, userId: number) {
    return this.request<ProjectUser>({
      exchange: 'auth',
      routingKey: 'removeProjectUser',
      payload: {
        projectId,
        userId,
      },
    });
  }
}
