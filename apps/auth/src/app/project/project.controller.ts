import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { ProjectService } from './project.service';
import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @RabbitRPC({
    routingKey: 'createProject',
  })
  @SerializeOptions({
    // type: Project
  })
  create(@RabbitPayload() payload: CreateProjectDto) {
    return this.projectService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneProject',
  })
  @SerializeOptions({
    // type: Project
  })
  findOne() {
    return this.projectService.findOne();
  }

  @RabbitRPC({
    routingKey: 'findAllProjects',
  })
  @SerializeOptions({
    // type: Project
  })
  findAll() {
    return this.projectService.findAll();
  }

  @RabbitRPC({
    routingKey: 'updateProject',
  })
  @SerializeOptions({
    // type: Project
  })
  update(@RabbitPayload() payload: UpdateProjectDto) {
    return this.projectService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeProject',
  })
  @SerializeOptions({
    // type: Project
  })
  remove() {
    return this.projectService.remove();
  }
}
