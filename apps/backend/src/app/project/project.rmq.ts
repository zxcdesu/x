import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { TokenDto } from '../auth/dto/token.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectRmq extends RmqService {
  create(userId: number, payload: CreateProjectDto) {
    return this.request<ProjectDto>({
      exchange: 'auth',
      routingKey: 'createProject',
      payload: {
        ...payload,
        userId,
      },
    });
  }

  findOne(userId: number, id: number) {
    return this.request<ProjectDto>({
      exchange: 'auth',
      routingKey: 'findOneProject',
      payload: {
        userId,
        id,
      },
    });
  }

  findAll(userId: number) {
    return this.request<ProjectDto[]>({
      exchange: 'auth',
      routingKey: 'findAllProjects',
      payload: {
        userId,
      },
    });
  }

  update(userId: number, id: number, payload: UpdateProjectDto) {
    return this.request<ProjectDto>({
      exchange: 'auth',
      routingKey: 'updateProject',
      payload: {
        ...payload,
        id,
        userId,
      },
    });
  }

  remove(userId: number, id: number) {
    return this.request<ProjectDto>({
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
