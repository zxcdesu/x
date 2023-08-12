import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectRmq extends RmqService {
  private readonly exchange = 'auth';

  create(userId: number, payload: CreateProjectDto) {
    return this.request<ProjectDto>({
      exchange: this.exchange,
      routingKey: 'createProject',
      payload: {
        ...payload,
        userId,
      },
    });
  }

  signIn(userId: number, projectId: number) {
    return this.request<ProjectDto>({
      exchange: this.exchange,
      routingKey: 'signInProject',
      payload: {
        userId,
        projectId,
      },
    });
  }

  findOne(userId: number, id: number) {
    return this.request<ProjectDto>({
      exchange: this.exchange,
      routingKey: 'findOneProject',
      payload: {
        userId,
        id,
      },
    });
  }

  findAll(userId: number, ids?: number[]) {
    return this.request<ProjectDto[]>({
      exchange: this.exchange,
      routingKey: 'findAllProjects',
      payload: {
        userId,
        ids,
      },
    });
  }

  update(userId: number, payload: UpdateProjectDto) {
    return this.request<ProjectDto>({
      exchange: this.exchange,
      routingKey: 'updateProject',
      payload: {
        ...payload,
        userId,
      },
    });
  }

  remove(userId: number, id: number) {
    return this.request<ProjectDto>({
      exchange: this.exchange,
      routingKey: 'removeProject',
      payload: {
        userId,
        id,
      },
    });
  }
}
