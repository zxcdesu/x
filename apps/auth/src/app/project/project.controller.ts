import { Controller } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @RabbitRPC({
    routingKey: 'createProject',
  })
  create() {
    return this.projectService.create();
  }

  @RabbitRPC({
    routingKey: 'findOneProject',
  })
  findOne() {
    return this.projectService.findOne();
  }

  @RabbitRPC({
    routingKey: 'findAllProjects',
  })
  findAll() {
    return this.projectService.findAll();
  }

  @RabbitRPC({
    routingKey: 'updateProject',
  })
  update() {
    return this.projectService.update();
  }

  @RabbitRPC({
    routingKey: 'removeProject',
  })
  remove() {
    return this.projectService.remove();
  }
}
