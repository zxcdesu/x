import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @RabbitRPC({
    routingKey: 'createProject',
  })
  @SerializeOptions({
    // type: Project
  })
  create() {
    return this.projectService.create();
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
  update() {
    return this.projectService.update();
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
