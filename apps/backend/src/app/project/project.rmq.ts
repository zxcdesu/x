import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { TokenDto } from '../auth/dto/token.dto';
import { CreateProjectArgs } from './dto/create-project.args';
import { ProjectObject } from './dto/project.object';
import { UpdateProjectArgs } from './dto/update-project.args';

@Injectable()
export class ProjectRmq extends RmqService {
  create(userId: number, payload: CreateProjectArgs) {
    return this.request<ProjectObject>({
      exchange: 'auth',
      routingKey: 'createProject',
      payload: {
        userId,
        ...payload,
      },
    });
  }

  findOne(userId: number, id: number) {
    return this.request<ProjectObject>({
      exchange: 'auth',
      routingKey: 'findOneProject',
      payload: {
        userId,
        id,
      },
    });
  }

  findAll(userId: number) {
    return this.request<ProjectObject[]>({
      exchange: 'auth',
      routingKey: 'findAllProjects',
      payload: {
        userId,
      },
    });
  }

  update(userId: number, id: number, payload: UpdateProjectArgs) {
    return this.request<ProjectObject>({
      exchange: 'auth',
      routingKey: 'updateProject',
      payload: {
        userId,
        id,
        ...payload,
      },
    });
  }

  remove(userId: number, id: number) {
    return this.request<ProjectObject>({
      exchange: 'auth',
      routingKey: 'removeProject',
      payload: {
        userId,
        id,
      },
    });
  }

  signIn(userId: number, id: number) {
    return this.request<TokenDto>({
      exchange: 'auth',
      routingKey: 'signInProject',
      payload: {
        userId,
        id,
      },
    });
  }
}
